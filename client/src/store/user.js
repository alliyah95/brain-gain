import { createContext, useState } from "react";

const UserContext = createContext({
    user: null,
});

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);

    const userHandler = async (userData) => {
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
