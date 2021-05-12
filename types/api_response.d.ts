import { APIError } from "./api_error";

export interface APIResponse {
    error?: APIError
    data?: Object
}