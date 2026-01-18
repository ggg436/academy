import { create } from "zustand";

type SaveProgressModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useSaveProgressModal = create<SaveProgressModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
