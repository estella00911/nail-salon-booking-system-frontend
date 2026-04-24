interface AuthPayload {
    email: string;
    password: string;
}

interface RegisterPayload extends AuthPayload {
    name: string;
}

interface LoginPayload extends AuthPayload{}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthData {
    user: User;
    token: string;
}

export type {
    RegisterPayload,
    LoginPayload,
    User,
    AuthData
};