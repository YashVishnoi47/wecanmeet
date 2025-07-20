import { create } from "zustand";

const UseCompStore = create((set) => ({
  dashboardComp: "Meetings",
  setDashboardComp: (dashboardComp) => set({ dashboardComp }),

  settingsComp: "User Settings",
  setSettingsComp: (settingsComp) => set({ settingsComp }),
}));

export default UseCompStore;
