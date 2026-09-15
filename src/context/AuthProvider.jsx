import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firabase.init";

export const AuthContext = createContext(null);

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem("access-token"));

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const loginUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, provider)
    }
    const userLogout = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (name, photoURL) =>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName:name,
            photoURL:photoURL
        })
       
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const token = await currentUser.getIdToken();
                    localStorage.setItem("access-token", token);
                    setAuthToken(token);
                } catch {
                    localStorage.removeItem("access-token");
                    setAuthToken(null);
                }
            } else {
                localStorage.removeItem("access-token");
                setAuthToken(null);
            }
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const userInfo = {
        user,
        loading,
        authToken,
        createUser,
        updateUserProfile,
        loginUser,
        googleSignIn,
        userLogout,
    };
    return <AuthContext value={userInfo}>{children}</AuthContext>;
};
export default AuthProvider;
