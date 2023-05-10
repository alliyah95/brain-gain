import React from "react";
import { useInView } from "react-intersection-observer";

const FeatureCard = ({ title, description, illustration }) => {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <div
            ref={ref}
            className={`border border-brown p-5 rounded-md ${
                inView ? "slide-in-up" : ""
            }`}
        >
            <div className=" h-10 w-10 mb-5 lg:mb-6 mt-2 text-yellow">
                {illustration}
            </div>

            <h3 className="text-xl lg:text-2xl font-black text-brown">
                {title}
            </h3>
            <p>{description}</p>
        </div>
    );
};

export default FeatureCard;
