import { create } from "zustand";

const UseUserStore = create((set) => ({
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

  userCard: "",
  setUserCard: (userCard) => set({ userCard }),

  userMeetings: "",
  setuserMeetings: (userMeetings) => set({ userMeetings }),

  triggerMeetingFetch: false,
  setTriggerMeetingFetch: (triggerMeetingFetch) => set({ triggerMeetingFetch }),

  filter: "all",
  setFilter: (filter) => set({ filter }),
}));

export default UseUserStore;
