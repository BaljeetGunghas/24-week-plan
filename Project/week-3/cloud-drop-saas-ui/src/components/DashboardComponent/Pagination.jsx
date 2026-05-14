const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    // always show first page
    pages.push(1);

    // left ellipsis
    if (currentPage > 3) {
      pages.push("...");
    }

    // middle pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    // right ellipsis
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return [...new Set(pages)];
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10 absolute bottom-20 left-1/2">
      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 text-slate-400">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-xl font-bold transition-all
              ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }
            `}
          >
            {page}
          </button>
        ),
      )}
    </div>
  );
};

export default Pagination;
