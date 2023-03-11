import { createContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationContext = createContext({
    onNotify: () => {},
});

export const NotificationContextProvider = (props) => {
    const notificationHandler = (message) => {
        toast(message);
    };

    return (
        <NotificationContext.Provider value={{ onNotify: notificationHandler }}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
