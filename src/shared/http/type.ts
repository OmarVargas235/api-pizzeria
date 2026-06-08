export interface ApiErrorResponse {
    message: string;
    data: null;
}

export interface ApiResponse<T> {
    message: string;
    data: T;
}
