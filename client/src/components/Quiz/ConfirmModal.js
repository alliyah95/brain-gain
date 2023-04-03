const ConfirmModal = (props) => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-[90%] max-w-md  rounded-md p-5 md:p-8 ">
                <p className="mb-6">
                    Are you sure you want to delete this quiz?
                </p>
                <div className="flex justify-end gap-x-5">
                    <button
                        className="link"
                        onClick={() => {
                            props.onManageModal(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button className="btn" onClick={props.onDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
