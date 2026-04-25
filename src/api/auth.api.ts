import apiClient from "./client.ts";
import type {AuthData, LoginPayload, RegisterPayload} from "../types/auth.types.ts";
import type {ApiResponse} from "../types/api.types.ts";

const fetchUserLogin = (
    payload: LoginPayload
): Promise<ApiResponse<AuthData>> => {
    const { email, password } = payload;
    return apiClient<ApiResponse<AuthData>>('/api/users/login', {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        }),
    });
}

const fetchUserRegister = (
    payload: RegisterPayload
): Promise<ApiResponse<AuthData>> => {
    const { email, password, name } = payload;
    return apiClient<ApiResponse<AuthData>>('/api/users/register', {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            name
        })
    });
};
export {
    fetchUserLogin,
    fetchUserRegister
};