import { useState } from "react";
import { LinkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { customToast } from "../../util/customToast";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShareQuiz = ({ link, title }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        setIsCopied(true);
        customToast("success", `${title} link copied to clipboard!`);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
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
                <CopyToClipboard text={link} onCopy={handleCopy}>
                    <button className="btn px-3 lg:px-4">
                        {isCopied ? (
                            <CheckIcon className="h-4 w-4" />
                        ) : (
                            <LinkIcon className="h-4 w-4" />
                        )}
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    );
};

export default ShareQuiz;
