import type {Pagination} from "./pagination.types.ts";

interface ApiError {
    type: string,
    title: string,
    status: number,
    detail: string
}

type ApiResponse<T> =
    | {
    success: true;
    message: string;
    data: T;
    pagination?: Pagination
}
    | {
    success: false;
    error: ApiError;
};

export type {
    ApiResponse,
    ApiError
}

