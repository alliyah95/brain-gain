import { useEffect, useState } from "react";

const Spinner = () => {
    const [showParagraph, setShowParagraph] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowParagraph(true);
        }, 7000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 z-50 flex flex-col justify-center items-center">
            <div className="flex">
                <div className="relative">
                    <div className="w-12 h-12"></div>
                    <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-brown-darker border-t-transparent"></div>
                </div>
            </div>
            {showParagraph && (
                <p className="mt-24 bg-brown-darker text-sm text-white max-w-md text-center rounded-md p-4 m-4">
                    Brain Gain is currently deployed as a free service, so
                    loading may take a while at times. Please be patient 🥺
                </p>
            )}
        </div>
    );
};

export default Spinner;
