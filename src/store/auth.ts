import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { environment } from "../environment";
import { LoaderService } from "../shared/services/LoaderService";
import { User } from "../api/services/auth/models";
import { authControllerStatus } from "../api/services/auth/auth";

interface AuthStore {
	isLoggedIn: boolean;
	user: User | null;
	setLoggedIn: (isLoggedIn: boolean) => void;
	setUser: (user: User | null) => void;
	setToken: (token: string) => void;
	logout: () => void;
	validateToken: () => Promise<User | null>;
}

export const useAuthStore = create<AuthStore>((set, getStore) => ({
	isLoggedIn: false,
	user: null,
	setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
	setUser: (user) => {
		localStorage.setItem("userid", user?.id ?? "");
		return set({ user });
	},
	logout: () => {
		localStorage.clear();
		sessionStorage.clear();
		set({ isLoggedIn: false, user: null });
	},
	setToken: (token) => {
		localStorage.setItem("authToken", token);
		getStore().validateToken();
	},
	validateToken: async () => {
		const authToken = localStorage.getItem("authToken");
		if (authToken) {
			try {
				LoaderService.instance.showLoader();
				const user = await authControllerStatus();
				set({ isLoggedIn: true, user: user });
				return user;
			} catch (error) {
				console.error("[AuthStore] validateToken error", error);
				getStore().logout();
				return null;
			} finally {
				LoaderService.instance.hideLoader();
			}
		}
		getStore().logout();
		return null;
	},
}));

if (environment.production === false) {
	mountStoreDevtool("Auth", useAuthStore);
}
