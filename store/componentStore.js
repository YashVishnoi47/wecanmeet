import { create } from "zustand";

const UseCompStore = create((set) => ({
  dashboardComp: "Availability",
  setDashboardComp: (dashboardComp) => set({ dashboardComp }),
}));

export default UseCompStore;
