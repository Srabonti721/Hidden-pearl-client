import { Lottie } from "lottie-react";
import { use } from "react";
import { Link } from "react-router";
import registerAnimation from "../../assets/lotties/Register (1).json";
import { AuthContext } from "../../context/AuthProvider";

const Register = () => {
    const { createUser, updateUserProfile } = use(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;
        console.log(name, email, photoURL, password);
        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                updateUserProfile(name, photoURL);
                console.log("After update:", name, photoURL);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                    {/* Lottie Section */}
                    <div className="hidden md:flex bg-purple-50 items-center justify-center p-10">
                        <div className="w-full max-w-md">
                            <Lottie
                                src={registerAnimation}
                                loop={true}
                                autoplay
                            />

                            <div className="text-center mt-4">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Create Your Account
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    Join us and start your journey today.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Register Form */}
                    <div className="p-6 sm:p-10 md:p-12">
                        <div className="mb-7">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                                Create Account
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Fill in the information to create your account.
                            </p>
                        </div>

                        <form onSubmit={handleRegister}>
                            {/* Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                                    required
                                />
                            </div>

                            {/* Photo URL */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Photo URL
                                </label>

                                <input
                                    type="url"
                                    name="photoURL"
                                    placeholder="Enter your photo URL"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
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
                                    placeholder="Create a password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                                    required
                                />
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-200"
                            >
                                Create Account
                            </button>
                        </form>

                        {/* Login Link */}
                        <p className="text-center text-gray-500 mt-7">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-purple-600 font-semibold hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
