import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  favorites: [],

  toggleFavorite: (doctorId) => {
    set((state) => {
      const exists = state.favorites.includes(doctorId);
      return {
        favorites: exists
          ? state.favorites.filter((id) => id !== doctorId)
          : [...state.favorites, doctorId],
      };
    });
  },

  isFavorite: (doctorId) => {
    return get().favorites.includes(doctorId);
  },
}));

export default useAppStore;
