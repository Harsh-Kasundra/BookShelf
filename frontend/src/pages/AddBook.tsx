import { useState } from "react";
import { getAuthor } from "../features/author/authorSlice";
import { createBook } from "../features/book/bookSlice";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AddBook = () => {
  const dispatch: AppDispatch = useDispatch();
  const { authorData } = useSelector((state: RootState) => state.author);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorId, setAuthorId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAuthor());
  }, [dispatch]);

  const handleBookSubmit = async () => {
    const newBook = {
      title: title,
      description: description,
      authorId: parseInt(authorId),
    };
    setAuthorId("default");
    setDescription("");
    setTitle("");
    await dispatch(createBook(newBook));
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-between border-b mb-6">
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="text-2xl sm:text-4xl font-bold text-[#6366F1] p-4 hover:cursor-default "
        >
          Add Books
        </h1>
        <button
          onClick={() => {
            navigate("/addAuthor");
          }}
          className="bg-[#6366F1] border text-white rounded-xl text-base sm:text-lg w-28 sm:w-32 p-1 sm:p-2 mr-3"
        >
          Add Author
        </button>
      </div>

      <div className="flex justify-center">
        <div className="border rounded-xl p-5 w-11/12 ">
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
          <div>
            <button
              onClick={handleBookSubmit}
              className="bg-[#6366F1] text-white border rounded-xl p-2 text-lg w-32 ml-5"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
