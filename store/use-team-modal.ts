import { create } from "zustand";

type TeamModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useTeamModal = create<TeamModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
