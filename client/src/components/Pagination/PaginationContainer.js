import React from "react";

const PaginationContainer = ({ cards }) => {
    return (
        <ul className="preview-card-container">
            {cards.map((card, index) => {
                return <li key={index}>{card}</li>;
            })}
        </ul>
    );
};

export default PaginationContainer;
