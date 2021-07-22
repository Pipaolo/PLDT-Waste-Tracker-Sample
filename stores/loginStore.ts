import axios from "axios";
import create from "zustand";
import { signIn } from "next-auth/client";

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
  login: async (username, password) => {
    try {
      set({ isLoading: true, error: null, success: null });

      const response = await signIn("credentials", {
        username,
        password,
      });

      set({
        isLoading: false,
        error: null,
        success: "",
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
