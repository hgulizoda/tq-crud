import { create } from "zustand";

const useAuthStore = create((set) => ({
  auth: false,
  user: null,
  logIn: (user) => set({ auth: true, user }),
  logOut: () => set({ auth: false, user: null }),
}));

export default useAuthStore;
