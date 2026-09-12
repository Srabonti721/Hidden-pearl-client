import { Link, NavLink } from "react-router";

const Navbar = () => {
    const links = (
        <>
              <NavLink to={'/'} className="ml-2 text-xl hover:text-orange-300 text-white">Home</NavLink>
                <NavLink to={'/allFoods'} className="ml-2 text-xl hover:text-orange-300 text-white">All Foods</NavLink>
                <NavLink to={'/gallery'} className="ml-2 text-xl hover:text-orange-300 text-white">Gallery</NavLink>
        </>
    );
    return (
        <div className="navbar bg-black shadow-sm">
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
                <a className="text-3xl font-bold text-white">Hidden Pearl</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end">
                <Link to={'/login'} className="btn mr-2 bg-orange-400 text-white rounded-full">
                    Login
                </Link>
                <Link to={'/register'} className="btn bg-orange-400 text-white rounded-full">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
