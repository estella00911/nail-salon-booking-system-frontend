import ApiError from "./errors.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const apiClient = async <T> (
    url: string,
    options?: RequestInit,
): Promise<T> => {
    const token: string | null = localStorage.getItem("token");

    const res: Response = await fetch(`${BASE_URL}${url}`, {
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}`}),
            ...options?.headers,
        },
        ...options,
    });

    let data;
    try {
        data = await res.json();
    } catch {
        data = null;
    };

    if (!res.ok) {
        throw new ApiError(
            data?.error?.title || "API Error",
            res.status,
            data?.error?.detail
        );
    };

    return data;
};

export default apiClient;