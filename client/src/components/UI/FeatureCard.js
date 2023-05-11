const FeatureCard = ({ title, description, illustration }) => {
    return (
        <div className="border border-brown p-5 rounded-md">
            <div className=" h-10 w-10 mb-4 lg:mb-6 mt-2 text-yellow">
                {illustration}
            </div>

            <h3 className="text-xl lg:text-2xl font-black font-title text-brown">
                {title}
            </h3>
            <p>{description}</p>
        </div>
    );
};

export default FeatureCard;
