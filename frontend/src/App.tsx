import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Booklist } from "./pages/bookList";
import { AddBook } from "./pages/addBook";
import { AddAuthor } from "./pages/addAuthor";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Booklist />} />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/addAuthor" element={<AddAuthor />} />
          <Route path="/edit-book/:id" element={<AddBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
