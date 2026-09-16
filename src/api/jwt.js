import apiClient from "./apiClient";
import { ACCESS_TOKEN_KEY, removeStoredAccessToken } from "./storage";

// Exchange a logged-in user's email for a server-signed JWT and store it so the
// axios interceptor can attach it to every request.
export const createAccessToken = async (email) => {
    if (!email) return;
    try {
        const { data } = await apiClient.post("/jwt", { email });
        if (data?.token) localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
    } catch (error) {
        console.error("Failed to obtain access token:", error);
    }
};

export const clearAccessToken = removeStoredAccessToken;