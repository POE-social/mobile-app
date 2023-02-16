import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  loggedIn: boolean;
  toggle: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        loggedIn: false,
        toggle: () => set((state) => ({ loggedIn: !state.loggedIn })),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
