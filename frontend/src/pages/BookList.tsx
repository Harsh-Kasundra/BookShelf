import { BookCard } from "../components/BookCard";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../features/book/bookSlice";
import { getAuthor } from "../features/author/authorSlice";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

export const Booklist = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector((state: RootState) => state.book);
  const { authorData } = useSelector((state: RootState) => state.author);

  useEffect(() => {
    dispatch(getAuthor());
    dispatch(getBook());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div className="bg-[#F9FAFB] w-full">
        <div className="flex items-center justify-between border-b">
          <h1
            onClick={() => {
              navigate("/");
            }}
            className="text-2xl sm:text-4xl font-bold text-[#6366F1] p-4 hover:cursor-default"
          >
            bookShelf
          </h1>
          <div>
            <button
              onClick={() => {
                navigate("/addbook");
              }}
              className="bg-[#6366F1] border text-white rounded-xl text-base sm:text-lg w-28 sm:w-32 p-1 sm:p-2 mr-3"
            >
              Add Book
            </button>
          </div>
        </div>
        <div>
          <BookCard book={data} author={authorData} />
        </div>
      </div>
    </>
  );
};
