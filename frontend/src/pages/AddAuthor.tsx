import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createAuthor } from "../features/author/authorSlice";
import { useNavigate } from "react-router-dom";

export const AddAuthor = () => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleAuthorSubmit = () => {
    const newAuthor = {
      name: name,
    };
    dispatch(createAuthor(newAuthor));
    setName("");
    navigate("/addBook");
  };
  return (
    <>
      <div className="flex justify-between items-center border-b mb-10 hover:cursor-default">
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="text-2xl sm:text-4xl font-bold text-[#6366F1] p-4 hover:cursor-pointer "
        >
          Add Author
        </h1>
        <button
          onClick={() => {
            navigate("/addbook");
          }}
          className="bg-[#6366F1] border text-white rounded-xl text-base sm:text-lg w-28 sm:w-32 p-1 sm:p-2 mr-3"
        >
          Add Book
        </button>
      </div>

      <div className="flex justify-center">
        <div className="border rounded-xl p-5 w-11/12 ">
          <div className="p-5">
            <label htmlFor="name" className="font-medium text-lg">
              Name :
            </label>
            <div>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="border w-full h-10 rounded-lg p-4"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleAuthorSubmit}
              className="bg-[#6366F1] border rounded-xl p-2 text-lg w-32 ml-5"
            >
              Submit
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
