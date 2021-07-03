import axios from "axios";
import create from "zustand";

interface RegisterState {
  isLoading: boolean;
  success?: boolean;
  error?: Object;
  register: (data: Object) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  isLoading: false,
  success: false,
  error: null,
  register: async (data) => {
    set({
      isLoading: true,
      error: null,
      success: false,
    });

    const response = await axios.post("/api/auth/register", data);

    const responseData = await response.data;
    console.log(responseData);
    if (responseData.error) {
      set({
        isLoading: false,
        success: false,
        error: responseData.error.message,
      });
      return;
    }

    set({
      isLoading: false,
      success: true,
      error: null,
    });
  },
}));
