import { boolean } from "zod";
import { create } from "zustand";

const UseScheduleStore = create((set) => ({
  work: boolean,    
  setWork: (work) => set({ work }),
}));

export default UseScheduleStore;
