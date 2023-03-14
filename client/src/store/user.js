import { createContext, useState } from "react";
import User from "../../../server/models/User";

const UserContext = createContext({
    user: null,
    token: null,
});

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const userHandler = async (id) => {
        const currentUser = await User.findById(id);

        if (currentUser) {
            setUser(currentUser);
        }
    };

    const tokenHandler = () => {
        const currentToken = localStorage.getItem("token");

        if (currentToken) {
            setToken(currentToken);
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                onHandleUser: userHandler,
                onHandleToken: tokenHandler,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
