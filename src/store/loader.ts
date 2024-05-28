import { createStore } from "zustand/vanilla";
// import { environment } from "../environment";
// import { mountStoreDevtool } from "simple-zustand-devtools";

interface LoaderStore {
	open: boolean;
	setLoader: (open: boolean) => void;
}

export const useLoaderStore = createStore<LoaderStore>((set) => ({
	open: false,
	setLoader: (open) => set({ open }),
}));
