import React from "react";

interface BookCardProps {
  book: {
    id: number;
    title: string;
    description?: string;
    authorId: number;
    createdAt: Date;
    updateAt: Date;
  }[];
  author: {
    id: number;
    name: string;
    createdAt: Date;
    updateAt: Date;
  }[];
}

const formatDate = (date: string | Date): string => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const BookCard: React.FC<BookCardProps> = ({ book, author }) => {
  return book.map((bookItem) => {
    // Find the corresponding author for this book
    const bookAuthor = author.find((auth) => auth.id === bookItem.authorId);
    return (
      <div className="flex justify-center p-3" key={bookItem.id}>
        <div className="bg-[#FFFFFF] p-6 border rounded-3xl w-full md:w-1/2">
          <div className="flex flex-col sm:flex-row sm:gap-3">
            <div className="font-semibold flex items-end lg:text-2xl">
              {bookItem.title}
            </div>
            <div className="font-medium text-sm flex items-end lg:text-base text-[#5B6472]">
              {bookAuthor ? bookAuthor.name : "Unknown Author"}
            </div>
          </div>
          <div className="pt-1 text-[#96a0b0] text-sm lg:text-base font-light">
            {bookItem.description}
          </div>
          <div className="pt-3 text-[#2B3546] text-sm lg:text:base">
            Published on: {formatDate(bookItem.createdAt)}
          </div>
        </div>
      </div>
    );
  });
};
