import { create } from "zustand";

const UseLivePageStore = create((set) => ({
  user: {},
  setUser: (user) => set({ user }),

  schedule: {},
  setSchedule: (schedule) => set({ schedule }),

  meetingCard: [],
  setMeetingCard: (meetingCard) => set({ meetingCard }),

  timeRange: { start: "", end: "" },
  setTimeRange: (timeRange) => set({ timeRange }),

  selected: null,
  setSelected: (selected) => set({ selected }),

  selected: null,
  setSelected: (selected) => set({ selected }),

  SelectedWeakDay: "",
  setSelectedWeakDay: (SelectedWeakDay) => set({ SelectedWeakDay }),

  time: "",
  settime: (time) => set({ time }),

  TimeFormat: "12hr",
  setTimeFormat: (TimeFormat) => set({ TimeFormat }),

  step: 1,
  setStep: (step) => set({ step }),

  meetting: null,
  setMeetting: (meetting) => set({ meetting }),

  meettingBooked: false,
  setMeettingBooked: (meettingBooked) => set({ meettingBooked }),
}));

export default UseLivePageStore;
