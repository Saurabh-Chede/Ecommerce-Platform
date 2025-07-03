
function Pagination({totalPages,currentPage,setCurrentPage}) {
    return (
        <div className="flex justify-center mt-6 gap-2 flex-wrap mb-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 rounded border ${currentPage === pageNum
                            ? "bg-black text-white font-semibold"
                            : "bg-gray-100 text-black hover:bg-gray-200"
                        }`}
                >
                    {pageNum}
                </button>
            ))}
        </div>
    )
}

export default Pagination