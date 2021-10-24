import { APIResponse } from '../types/api_response';



interface ChangePasswordOptions {
    token:string;
    oldPassword:string;
    password: string;
    confirmPassword:string;
}

interface SettingsState {
  isLoading: boolean;
  error: any | null;
  changePassword: 
}
