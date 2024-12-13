import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Booklist } from "./pages/BookList";
import { AddBook } from "./pages/AddBook";
import { AddAuthor } from "./pages/AddAuthor";

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
