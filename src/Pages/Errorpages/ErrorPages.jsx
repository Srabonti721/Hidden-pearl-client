import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router";
const ErrorPages = () => {
    return (
        <div className="">
            <Link
                to={"/"}
                className="flex items-center gap-2 w-3/4 mx-auto my-4"
            >
                <FaArrowLeftLong style={{ color: "orange" }} size={24} />
                <h2 className="text-2xl text-orange-400 font-semibold">
                    {" "}
                    Back to home
                </h2>
            </Link>

            <img
                className="w-3/4 p-4 mx-auto border-orange-300 border rounded-3xl my-10"
                src="https://static.vecteezy.com/system/resources/previews/000/362/681/non_2x/vector-website-error-404-page-not-found.jpg"
                alt=""
            />
        </div>
    );
};

export default ErrorPages;
