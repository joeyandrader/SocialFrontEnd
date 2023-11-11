export interface APIResponse<T> {
    data: T,
    success: boolean,
    code: number,
    message?: string,
    resultCount: number
}