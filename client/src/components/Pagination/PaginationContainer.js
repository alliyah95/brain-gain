import React from "react";

const PaginationContainer = ({ cards, smHeight, lgHeight, xlHeight }) => {
    return (
        <div
            className={`h-[${smHeight}] lg:h-[${
                lgHeight ? lgHeight : "800px"
            }] xl:h-[${xlHeight ? xlHeight : "660px"}]`}
        >
            <ul className="preview-card-container">
                {cards.map((card, index) => {
                    return <li key={index}>{card}</li>;
                })}
            </ul>
        </div>
    );
};

export default PaginationContainer;
