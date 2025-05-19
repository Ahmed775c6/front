import { FC } from "react";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  numbn : number;
  setCurrentPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  currentPage,
  numbn,
  setCurrentPage,
}) => {
  const pages = [];
  for (let i = 1; i <= numbn; i++) {
    console.log(Math.ceil(totalPosts / postsPerPage));
    pages.push(i);
  }

  return (
    <div className="flex gap-2 justify-center mt-4">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() =>{ setCurrentPage(page)}

          }
          className={`w-11 h-11 ${
            currentPage === page
              ? "bg-[#144273] rounded-sm text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;