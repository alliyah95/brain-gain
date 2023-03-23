import { createContext, useState, useEffect } from "react";

const UserContext = createContext({
    user: null,
    onHandleUser: (userData) => {},
});

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const userHandler = (userData) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                onHandleUser: userHandler,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
