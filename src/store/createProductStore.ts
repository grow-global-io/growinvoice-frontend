import { createStore } from "zustand/vanilla";

interface ProductStore {
	open: boolean;
	setOpenProductForm: (open: boolean) => void;
}

export const useCreateProductStore = createStore<ProductStore>((set) => ({
	open: false,
	setOpenProductForm: (open) => set({ open }),
}));
