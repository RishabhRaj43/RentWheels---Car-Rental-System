import { create } from "zustand";

const useProfile = create(() => ({
  profile: localStorage.getItem("profile") || null,
  login: (profile) => {
    localStorage.setItem("profile", profile);
    set({ profile: profile });
  },
  logout: () => {
    localStorage.removeItem("profile");
    set({ profile: null });
  },
}));

export default useProfile;
