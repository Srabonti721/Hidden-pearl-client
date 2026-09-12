import { use } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
    const userInfo = use(AuthContext);
    return userInfo;
};

export default useAuth;
