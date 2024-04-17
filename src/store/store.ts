import {create} from 'zustand';

const initialState = {
  username: '',
  premium: false,
};

export const useUserStore = create((set) => ({
  ...initialState,
  setUserData: (newUsername, newPremium) =>
    set((state) => ({ username: newUsername, premium: newPremium })),
  resetState: () => set(initialState),
}));
