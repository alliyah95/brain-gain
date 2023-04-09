const ConfirmModal = ({
    message,
    actionBtn,
    onCancel,
    onAction,
    noButtons,
    addtlMsg,
}) => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-[90%] max-w-md rounded-md p-5 md:p-8 relative ">
                <button
                    className="absolute top-0 right-0 p-3"
                    onClick={() => {
                        onCancel(false);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div>{message}</div>

                {addtlMsg && (
                    <p className="mt-4 italic opacity-50 text-sm">{addtlMsg}</p>
                )}

                {!noButtons && (
                    <div className="flex justify-end gap-x-5">
                        <button
                            className="link"
                            onClick={() => {
                                onCancel(false);
                            }}
                        >
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
