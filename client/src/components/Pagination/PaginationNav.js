import { useState, useEffect } from "react";
import useMedia from "../../hooks/useMedia";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const getPageNumbers = (totalCards, cardsPerPage) => {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pageNumbers.push(i);
    }
    return pageNumbers;
};

const PaginationNav = ({
    totalCards,
    cardsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    const pageNumbers = getPageNumbers(totalCards, cardsPerPage);
    const [currentBtnGroup, setCurrentBtnGroup] = useState(
        pageNumbers.slice(0, 3)
    );
    const { isSmallScreen, isLargeScreen, isExtraLargeScreen } = useMedia();

    useEffect(() => {
        if (!pageNumbers.includes(currentPage)) {
            setCurrentPage(pageNumbers.length);
            const startIndex = Math.max(0, pageNumbers.length - 3);
            setCurrentBtnGroup(
                pageNumbers.slice(startIndex, pageNumbers.length)
            );
        }
    }, [isSmallScreen, isLargeScreen, isExtraLargeScreen, pageNumbers]);

    useEffect(() => {
        if (!currentBtnGroup.includes(currentPage)) {
            const currentPageIndex = pageNumbers.indexOf(currentPage);
            let newGroup = [];

            if (currentPageIndex === 0) {
                newGroup = pageNumbers.slice(0, 3);
            } else if (currentPageIndex === pageNumbers.length - 1) {
                newGroup = pageNumbers.slice(-3);
            } else {
                newGroup = [currentPage - 1, currentPage, currentPage + 1];
            }

            setCurrentBtnGroup(newGroup);
        }
    }, [currentPage, currentBtnGroup, pageNumbers]);

    if (pageNumbers.length === 1) {
        return;
    }

    const prevBtnHandler = () => {
        if (currentPage === pageNumbers[0]) {
            return;
        } else if (currentPage > pageNumbers[0]) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextBtnHandler = () => {
        if (currentPage === pageNumbers[pageNumbers.length - 1]) {
            return;
        } else if (currentPage < pageNumbers[pageNumbers.length - 1]) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-end mt-4 gap-x-2">
            <button className="btn--pagination" onClick={prevBtnHandler}>
                <ChevronLeftIcon className="h-3.5 w-3.5" />
            </button>

            {currentBtnGroup.map((page, index) => {
                return (
                    <button
                        key={index}
                        className={`btn--pagination ${
                            page === currentPage ? "btn--pagination-active" : ""
                        }`}
                        onClick={() => {
                            setCurrentPage(page);
                        }}
                    >
                        {page}
                    </button>
                );
            })}

            <button className="btn--pagination" onClick={nextBtnHandler}>
                <ChevronRightIcon className="h-3.5 w-3.5" />
            </button>
        </div>
    );
};

export default PaginationNav;
