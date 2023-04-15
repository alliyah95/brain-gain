import React from "react";

const PaginationContainer = ({ cards }) => {
    return (
        <div className="min-h-[85vh] xl:min-h-[670px]">
            <ul className="preview-card-container">
                {cards.map((card, index) => {
                    return <li key={index}>{card}</li>;
                })}
            </ul>
        </div>
    );
};

export default PaginationContainer;
