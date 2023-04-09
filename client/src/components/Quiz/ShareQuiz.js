import { toast } from "react-toastify";

const ShareQuiz = ({ link, title }) => {
    const copyHandler = () => {
        navigator.clipboard.writeText(link);
        toast(`${title} link copied to clipboard!`);
    };

    return (
        <div>
            <label>{title}</label>
            <div className="flex gap-x-2 lg:gap-x-3 mt-2">
                <input
                    type="text"
                    value={link}
                    readOnly
                    className="w-full bg-brown bg-opacity-10 text-brown rounded-md p-2 text-sm outline-none"
                />
                <button className="btn px-3 lg:px-4" onClick={copyHandler}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-link-45deg"
                        viewBox="0 0 16 16"
                    >
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ShareQuiz;
