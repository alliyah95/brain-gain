import { toast } from "react-toastify";
import {
    InformationCircleIcon,
    CheckBadgeIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const ICONS = {
    success: <CheckBadgeIcon />,
    error: <ExclamationTriangleIcon />,
    info: <InformationCircleIcon />,
};

export const customToast = (type, message) => {
    toast(message, { icon: ICONS[type] });
};
