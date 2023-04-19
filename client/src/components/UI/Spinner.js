const Spinner = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 z-50 flex justify-center items-center">
            <div className="flex">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full absoluteborder-2 border-solid border-brown-darker border-opacity-50"></div>
                    <div className="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-brown-darker border-t-transparent"></div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
