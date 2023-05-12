const FeatureCard = ({ title, description, src, alt }) => {
    return (
        <div className="border border-brown p-5 rounded-md">
            <div className=" h-16 w-16 my-4 lg:mt-6 lg:mb-4 text-yellow">
                <img src={src} alt={alt} />
            </div>

            <h3 className="text-xl lg:text-2xl font-black font-title text-brown">
                {title}
            </h3>
            <p>{description}</p>
        </div>
    );
};

export default FeatureCard;
