import { create } from "zustand";

const UseCompStore = create((set) => ({
  dashboardComp: "Meetings",
  setDashboardComp: (dashboardComp) => set({ dashboardComp }),
}));

export default UseCompStore;
