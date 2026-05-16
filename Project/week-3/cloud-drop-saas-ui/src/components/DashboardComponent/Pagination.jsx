const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return [...new Set(pages)];
  };

  return (
    <div className="flex items-center justify-center mt-1">
      <div className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-1 shadow-lg">
        {getPages().map((page, index) =>
          page === "..." ? (
            <span
              key={index}
              className="px-2 sm:px-3 text-xs sm:text-sm text-slate-400"
            >
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`
                min-w-[32px] sm:min-w-[38px]
                h-8 sm:h-9
                px-2 sm:px-3
                rounded-xl
                text-xs sm:text-sm
                font-medium
                transition-all
                duration-200
                ${
                  currentPage === page
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-white/10"
                }
              `}
            >
              {page}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default Pagination;
