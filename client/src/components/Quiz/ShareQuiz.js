import { LinkIcon } from "@heroicons/react/24/solid";
import { customToast } from "../../util/customToast";

const ShareQuiz = ({ link, title }) => {
    const copyHandler = () => {
        navigator.clipboard.writeText(link);
        customToast("success", `${title} link copied to clipboard!`);
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
                    <LinkIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default ShareQuiz;
