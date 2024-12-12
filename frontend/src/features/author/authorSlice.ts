import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

interface authorData {
  id: number;
  name: string;
  createdAt: Date;
  updateAt: Date;
}

interface authorState {
  authorData: authorData[];
  authorStatus: "idle" | "loading" | "succeeded" | "failed";
  authorError: string | null;
}

const initialState: authorState = {
  authorData: [],
  authorStatus: "idle",
  authorError: null,
};

export const getAuthor = createAsyncThunk<
  authorData[],
  void,
  { rejectValue: string }
>("author/getAuthor", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get<authorData[]>("/author");
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed to fetch";
    return rejectWithValue(message);
  }
});

export const createAuthor = createAsyncThunk<
  authorData,
  Omit<authorData, "id" | "createdAt" | "updateAt">,
  { rejectValue: string }
>("author/createAuthor", async (newAuthor, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<authorData>("/author", newAuthor);
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed To post";
    return rejectWithValue(message);
  }
});

export const updateAuthor = createAsyncThunk<
  authorData,
  { id: number; updates: Partial<authorData> },
  { rejectValue: string }
>("author/updateAuthor", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put<authorData>(`/author/${id}`, updates);
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed to update";
    return rejectWithValue(message);
  }
});

export const deleteAuthor = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("book/delete", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/author/${id}`);
    return id;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed to delete";
    return rejectWithValue(message);
  }
});

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthor.pending, (state) => {
      state.authorStatus = "loading";
    });
    builder.addCase(getAuthor.fulfilled, (state, action) => {
      state.authorStatus = "succeeded";
      state.authorData = action.payload;
    });
    builder.addCase(getAuthor.rejected, (state, action) => {
      state.authorStatus = "failed";
      state.authorError = action.payload || "Unknown Error";
    });

    builder.addCase(createAuthor.pending, (state) => {
      state.authorStatus = "loading";
    });
    builder.addCase(createAuthor.fulfilled, (state, action) => {
      state.authorStatus = "succeeded";
      state.authorData.push(action.payload);
    });
    builder.addCase(createAuthor.rejected, (state, action) => {
      state.authorStatus = "failed";
      state.authorError = action.payload || "Unknown Error";
    });

    builder.addCase(updateAuthor.pending, (state) => {
      state.authorStatus = "loading";
    });
    builder.addCase(updateAuthor.fulfilled, (state, action) => {
      state.authorStatus = "succeeded";
      const index = state.authorData.findIndex(
        (author) => author.id === action.payload.id
      );
      if (index !== -1) {
        state.authorData[index] = action.payload;
      }
    });
    builder.addCase(updateAuthor.rejected, (state, action) => {
      state.authorStatus = "failed";
      state.authorError = action.payload || "Unknown Error";
    });

    builder.addCase(deleteAuthor.pending, (state) => {
      state.authorStatus = "loading";
    });
    builder.addCase(deleteAuthor.fulfilled, (state, action) => {
      state.authorStatus = "succeeded";
      state.authorData = state.authorData.filter(
        (author) => author.id !== action.payload
      );
    });
    builder.addCase(deleteAuthor.rejected, (state, action) => {
      state.authorStatus = "failed";
      state.authorError = action.payload || "Unknown Error";
    });
  },
});

export default authorSlice.reducer;
