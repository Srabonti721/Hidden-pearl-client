import { Lottie } from "lottie-react";
import { Link } from "react-router";
import loginAnimation from "../../assets/lotties/Confetti.json";

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);
    };

    // const handleGoogleLogin = () => {
    //     console.log("Google login");
    // };
    return (
        <div className="min-h-screen  from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                    {/* Left - Lottie */}
                    <div className="hidden md:flex bg-blue-50 items-center justify-center p-10">
                        <div className="w-full max-w-md">
                            <Lottie src={loginAnimation} loop={true} autoplay />

                            <div className="text-center mt-4">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Welcome Back
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    Login to continue your journey with us.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right - Login Form */}
                    <div className="p-6 sm:p-10 md:p-12">
                        <div className="mb-8">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                                Login
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Welcome back! Please enter your details.
                            </p>
                        </div>

                        <form onSubmit={handleLogin}>
                            {/* Email */}
                            <div className="mb-5">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                    required
                                />
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
                            >
                                Login
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="h-px bg-gray-200 flex-1"></div>

                            <span className="text-sm text-gray-400">OR</span>

                            <div className="h-px bg-gray-200 flex-1"></div>
                        </div>

                        {/* Google Login */}
                        <button className="w-full border border-gray-300 hover:bg-gray-50 font-semibold text-gray-700 py-3 rounded-xl transition duration-200 flex items-center justify-center gap-3">
                            <svg
                                aria-label="Google logo"
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <g>
                                    <path d="m0 0H512V512H0" fill="#fff"></path>
                                    <path
                                        fill="#34a853"
                                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                                    ></path>
                                    <path
                                        fill="#4285f4"
                                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                                    ></path>
                                    <path
                                        fill="#fbbc02"
                                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                                    ></path>
                                    <path
                                        fill="#ea4335"
                                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                                    ></path>
                                </g>
                            </svg>
                            Login with Google
                        </button>

                        {/* Register */}
                        <p className="text-center text-gray-500 mt-7">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
