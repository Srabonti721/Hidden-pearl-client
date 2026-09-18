import axios from "axios";
import { getStoredAccessToken } from "./storage";

// Attach the server-issued JWT (obtained from /jwt after login) to every
// request when one exists in browser storage.
const apiClient = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "https://hidden-pearl-server.vercel.app",
    timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
    const token = getStoredAccessToken();
    if (!token) return config;
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default apiClient;
