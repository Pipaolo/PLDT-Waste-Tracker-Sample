import { APIError } from './api_error';

export interface APIResponse<T = any> {
  message?: string;
  error?: APIError;
  data?: T;
}
