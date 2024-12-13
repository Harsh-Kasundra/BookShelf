import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { createBook, updateBook } from "../features/book/bookSlice";
import { getAuthor } from "../features/author/authorSlice";

export const AddBook = () => {
  const dispatch: AppDispatch = useDispatch();
  const { authorData } = useSelector((state: RootState) => state.author);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorId, setAuthorId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const bookToEdit = location.state?.book;
  const isEditMode = !!bookToEdit;

  useEffect(() => {
    dispatch(getAuthor());

    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setDescription(bookToEdit.description || "");
      setAuthorId(bookToEdit.authorId.toString());
    }
  }, [dispatch, bookToEdit]);

  const handleBookSubmit = async () => {
    const bookData = {
      title: title,
      description: description,
      authorId: parseInt(authorId),
    };

    try {
      if (isEditMode) {
        const updateData = {
          updates: {
            title: title,
            description: description,
            authorId: parseInt(authorId),
          },
        };
        await dispatch(
          updateBook({
            id: bookToEdit.id,
            ...updateData,
          })
        );
      } else {
        await dispatch(createBook(bookData));
      }

      setAuthorId("default");
      setDescription("");
      setTitle("");

      navigate("/");
    } catch (error) {
      console.error("Failed to submit book", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border-b mb-6">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl sm:text-4xl font-bold text-[#6366F1] p-4 hover:cursor-pointer"
        >
          {isEditMode ? "Edit Book" : "Add Books"}
        </h1>
        <button
          onClick={() => navigate("/addAuthor")}
          className="bg-[#6366F1] border text-white rounded-xl text-base sm:text-lg w-28 sm:w-32 p-1 sm:p-2 mr-3"
        >
          Add Author
        </button>
      </div>

      <div className="flex justify-center">
        <div className="border rounded-xl p-5 w-11/12">
          <div className="p-5">
            <label htmlFor="title" className="font-medium text-lg">
              Title :{" "}
            </label>
            <div>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                value={title}
                id="title"
                placeholder="Title"
                className="border w-full h-10 rounded-lg p-4"
              />
            </div>
          </div>
          <div className="p-5">
            <label htmlFor="description" className="font-medium text-lg">
              Description :{" "}
            </label>
            <div>
              <input
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type="text"
                id="description"
                value={description}
                placeholder="Description"
                className="border w-full h-10 rounded-lg p-4"
              />
            </div>
          </div>
          <div className="p-5">
            <label htmlFor="author" className="font-medium text-lg">
              Author :{" "}
            </label>
            <div>
              <select
                id="author"
                aria-label="Auhtor"
                value={authorId}
                onChange={(e) => {
                  setAuthorId(e.target.value);
                }}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pl-3 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border"
              >
                <option value={"default"}>select author</option>
                {authorData.map((author) => {
                  return (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleBookSubmit}
              className="bg-[#6366F1] text-white border rounded-xl p-2 text-lg w-32 ml-5"
            >
              {isEditMode ? "Update" : "Submit"}
            </button>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="bg-[#f16363] border rounded-xl p-2 text-lg w-32 ml-5"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};