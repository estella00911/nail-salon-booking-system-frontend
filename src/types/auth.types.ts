interface AuthPayload {
    email: string;
    password: string;
}

interface RegisterPayload extends AuthPayload {
    name: string;
}

type LoginPayload = AuthPayload;

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