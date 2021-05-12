import create from "zustand";

interface LoginState {
  isLoading: boolean;
  success?: Object;
  error?: Object;
  login: (username: string, pin: string) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  isLoading: false,
  success: false,
  error: null,
  login: async (username, pin) => {
    try {
      set({ isLoading: true, error: null, success: null });
      const response = await fetch("/api/auth/login", {
        method: "PATCH",
        body: JSON.stringify({
          username,
          pin,
        }),
      });

      const responseData = await response.json();

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
