import { create } from "zustand";

const useUserStore = create((set) => ({
  userName: "",
  setUsername: (name) => set({ name }),

  email: "",
  setEmail: (email) => set({ email }),

  password: "",
  setPassword: (password) => set({ password }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  errormsg: "",
  setErrormsg: (errormsg) => set({ errormsg }),
}));

export default useUserStore;
