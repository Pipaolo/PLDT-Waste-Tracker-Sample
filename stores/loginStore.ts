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
      console.log(response);
      // const response = await axios.patch("/api/auth/login", {
      //   phoneNumber,
      //   password,
      // });

      // const responseData = await response.data;

      // if (responseData.error) {
      //   set({
      //     isLoading: false,
      //     error: responseData.error.message,
      //     success: null,
      //   });
      //   return;
      // }
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
