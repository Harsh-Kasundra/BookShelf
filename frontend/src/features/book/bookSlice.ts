import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInstance";

interface bookData {
  id: number;
  title: string;
  description?: string;
  authorId: number;
  createdAt: Date;
  updateAt: Date;
}

interface bookState {
  data: bookData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: bookState = {
  data: [],
  status: "idle",
  error: null,
};

export const getBook = createAsyncThunk<
  bookData[], // return type
  void, // inputs
  { rejectValue: string }
>("book/getBook", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<bookData[]>("/book");
    const res = response.data;
    return res;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed to fetch";
    return rejectWithValue(message);
  }
});

export const createBook = createAsyncThunk<
  bookData,
  Omit<bookData, "id" | "createdAt" | "updateAt">,
  { rejectValue: string }
>("book/createBook", async (newBook, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<bookData>("/book", newBook);
    return res.data; // Ensure this returns a single bookData, not an array
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed to create book";
    return rejectWithValue(message);
  }
});

export const updateBook = createAsyncThunk<
  bookData,
  { id: number; updates: Partial<bookData> },
  { rejectValue: string }
>("book/updateBook", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put<bookData>(`/book/${id}`, updates); // API returns single book
    return res.data;
  } catch (error: any) {
    const message =
      error.message || error.response?.data?.message || "Failed to update book";
    return rejectWithValue(message);
  }
});

export const deleteBook = createAsyncThunk<
  number,
  number,
  { rejectValue: string } // Error type
>("book/delete", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/book/${id}`);
    return id;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed to delete book";
    return rejectWithValue(message);
  }
});

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBook.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(getBook.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Unknown Error";
    });

    builder.addCase(createBook.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data.push(action.payload);
    });
    builder.addCase(createBook.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Unknown Error";
    });

    builder.addCase(updateBook.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.data.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload; // Update book in the state
      }
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Unknown Error";
    });

    builder.addCase(deleteBook.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = state.data.filter((book) => book.id !== action.payload);
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Unknown Error";
    });
  },
});

export default bookSlice.reducer;
