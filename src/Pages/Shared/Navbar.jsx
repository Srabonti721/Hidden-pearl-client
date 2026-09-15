import { use } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import userIcon from "../../assets/user.png";
import { AuthContext } from "../../context/AuthProvider";
const Navbar = () => {
    const { user, userLogout } = use(AuthContext);
    const handleLogout = () => {
        userLogout()
            .then(() => {
                Swal.fire({
                    title: "Logout successfull",
                    icon: "success",
                    draggable: true,
                });
            })
            .catch((error) => console.log(error));
    };
    const links = (
        <>
            <NavLink to={"/"} className="ml-2 text-xl hover:text-orange-300 ">
                Home
            </NavLink>
            <NavLink
                to={"/allFoods"}
                className="ml-2 text-xl hover:text-orange-300 "
            >
                All Foods
            </NavLink>
            <NavLink
                to={"/gallery"}
                className="ml-2 text-xl hover:text-orange-300 "
            >
                Gallery
            </NavLink>
            {user && (
                <NavLink
                    to="/my-foods"
                    className="ml-2 text-xl hover:text-orange-300 "
                >
                    My Foods
                </NavLink>
            )}
            {user && (
                <NavLink
                    to="/add-food"
                    className="ml-2 text-xl hover:text-orange-300 "
                >
                    Add Food
                </NavLink>
            )}
        </>
    );
    return (
        <div className="navbar bg-white shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            aria-label="Menu"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{" "}
                        </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>

                <img
                    className="w-10"
                    src="https://img.icons8.com/?size=64&id=BZObKCd3ZSVS&format=png"
                    alt=""
                />
                <a className="text-3xl font-bold">Hidden Pearl</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <>
                        <div
                            className="avatar  tooltip tooltip-bottom"
                            data-tip={user?.email}
                        >
                            <div className="w-10 rounded-full ">
                                <img
                                    src={`${user ? user?.photoURL : userIcon}`}
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="btn text-xl ml-2 bg-orange-400 text-white rounded-full"
                        >
                            logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to={"/login"}
                            className="btn mr-2 text-xl bg-orange-400 text-white rounded-full"
                        >
                            Login
                        </Link>
                        <Link
                            to={"/register"}
                            className="btn text-xl bg-orange-400 text-white rounded-full"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
