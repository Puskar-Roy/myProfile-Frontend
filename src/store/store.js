import { create } from "zustand";

export const useAuthStore = create((set) => ({
  auth: {
    userName: "",
    profile:"",
    active : false
  },
  setUsername: (name) => {
    set((state) => ({ auth: { ...state.auth , userName : name} }));
  },
}));
