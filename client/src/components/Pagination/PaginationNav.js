import React from "react";

const PaginationNav = ({ totalCards, cardsPerPage, setCurrentPage }) => {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (pageNumbers.length === 1) {
        return;
    }

    return (
        <div className="flex justify-end mt-4 gap-x-4">
            {pageNumbers.map((page, index) => {
                return (
                    <button
                        key={index}
                        className="btn"
                        onClick={() => {
                            setCurrentPage(page);
                        }}
                    >
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default PaginationNav;
