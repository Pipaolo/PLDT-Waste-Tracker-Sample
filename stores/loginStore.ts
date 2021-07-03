import axios from "axios";
import create from "zustand";

interface LoginState {
  isLoading: boolean;
  success?: Object;
  error?: Object;
  login: (phoneNumber: string, password: string) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  isLoading: false,
  success: false,
  error: null,
  login: async (phoneNumber, password) => {
    try {
      set({ isLoading: true, error: null, success: null });
      const response = await axios.patch("/api/auth/login", {
        phoneNumber,
        password,
      });

      const responseData = await response.data;

      if (responseData.error) {
        set({
          isLoading: false,
          error: responseData.error.message,
          success: null,
        });
        return;
      }
      set({
        isLoading: false,
        error: null,
        success: responseData.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
        success: null,
      });
    }
  },
}));
