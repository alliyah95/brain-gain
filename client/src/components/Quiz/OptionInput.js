import { XMarkIcon } from "@heroicons/react/24/solid";

const OptionInput = ({ id, type, value, handler, deleteHandler }) => {
    return (
        <div className="relative flex items-center">
            <input
                id={id}
                type="text"
                placeholder={`${type} ${id}`}
                className="line-input"
                value={value}
                onChange={handler}
            />
            <button
                type="button"
                className="absolute right-0"
                onClick={() => {
                    deleteHandler(id - 1);
                }}
            >
                <XMarkIcon className="h-6 w-6 text-brown" />
            </button>
        </div>
    );
};

export default OptionInput;
