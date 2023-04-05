import React, { useState, useEffect } from "react";
import {
    Form,
    NavLink,
    Link,
    useLocation,
    useRouteLoaderData,
} from "react-router-dom";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { logoutUser } from "../../util/auth";

export default function Example({ tokenProp }) {
    const [openNav, setOpenNav] = useState(false);
    const location = useLocation();
    const [path, setPath] = useState();
    const [btnName, setBtnName] = useState();
    const token = useRouteLoaderData("root");

    useEffect(() => {
        if (location.pathname === "/login") {
            setPath("/signup");
            setBtnName("Sign up");
        } else {
            setPath("/login");
            setBtnName("Sign in");
        }
    }, [location.pathname]);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navbarCollapseHandler = () => {
        if (window.innerWidth < 960) {
            setOpenNav(false);
        }
    };

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center text-light-brown lg:gap-3">
            <Typography as="li" variant="small" className="p-1 font-normal">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active-nav-link" : ""
                    }
                    onClick={navbarCollapseHandler}
                >
                    Dashboard
                </NavLink>
            </Typography>
            <Typography as="li" variant="small" className="p-1 font-normal">
                <NavLink
                    to="/quizzes"
                    className={({ isActive }) =>
                        isActive ? "active-nav-link" : ""
                    }
                    onClick={navbarCollapseHandler}
                >
                    My Quizzes
                </NavLink>
            </Typography>
            <Typography as="li" variant="small" className="p-1 font-normal">
                <NavLink
                    to="/create_quiz"
                    className={({ isActive }) =>
                        isActive ? "active-nav-link" : ""
                    }
                    onClick={navbarCollapseHandler}
                >
                    Create a new quiz
                </NavLink>
            </Typography>

            <li>
                <Button
                    onClick={logoutUser}
                    variant="filled"
                    size="sm"
                    fullWidth
                    ripple={false}
                    type="submit"
                    className=" btn bg-yellow shadow-none hover:bg-yellow lg:bg-light-brown  text-brown hover:shadow-none mt-1 lg:mt-0"
                >
                    <span>Logout</span>
                </Button>
            </li>
        </ul>
    );

    return (
        <>
            <Navbar
                className="h-max max-w-full rounded-md py-2 px-5 xl:px-8 lg:py-4 bg-brown  mx-auto"
                shadow={false}
                blurred={false}
                fullWidth={true}
            >
                <div className="flex items-center justify-between text-light-brown">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        <h2>brain gain</h2>
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className=" hidden lg:block">
                            {(token || tokenProp) && navList}
                        </div>
                        {!token && !tokenProp && (
                            <Link className="btn btn--link" to={path}>
                                {btnName}
                            </Link>
                        )}
                        {(token || tokenProp) && (
                            <IconButton
                                variant="text"
                                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                {openNav ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </IconButton>
                        )}
                    </div>
                </div>
                <MobileNav open={openNav}>
                    {(token || tokenProp) && navList}
                </MobileNav>
            </Navbar>
        </>
    );
}
