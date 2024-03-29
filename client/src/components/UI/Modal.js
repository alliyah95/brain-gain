import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ConfirmModal = ({
    message,
    actionBtn,
    onCancel,
    onAction,
    noButtons,
    addtlMsg,
    blurredBg,
}) => {
    const [isExiting, setIsExiting] = useState(false);

    const generalCancelHandler = () => {
        setIsExiting(true);
        setTimeout(() => {
            onCancel(false);
        }, 150);
    };
    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center ${
                blurredBg ? "backdrop-blur" : ""
            }`}
        >
            <div
                className={`bg-white w-[90%] max-w-md rounded-md p-5 md:p-8 relative ${
                    isExiting ? "fade-out" : "slide-in-up"
                }`}
            >
                <button
                    className="absolute top-0 right-0 p-4"
                    onClick={generalCancelHandler}
                >
                    <XMarkIcon className="h-6 w-6 text-brown" />
                </button>
                <div className="mt-4">{message}</div>

                {addtlMsg && (
                    <p className="mt-4 italic opacity-50 text-sm">{addtlMsg}</p>
                )}

                {!noButtons && (
                    <div className="flex justify-end gap-x-5 mt-4 lg:mt-6">
                        <button className="link" onClick={generalCancelHandler}>
                            Cancel
                        </button>
                        <button className="btn" onClick={onAction}>
                            {actionBtn}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmModal;
