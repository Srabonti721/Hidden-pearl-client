export const ACCESS_TOKEN_KEY = "access-token";

export const getStoredAccessToken = () =>
    localStorage.getItem(ACCESS_TOKEN_KEY);

export const removeStoredAccessToken = () =>
    localStorage.removeItem(ACCESS_TOKEN_KEY);