import { CreateVendorsWithAddressDto } from "@api/services/models";
import { createStore } from "zustand/vanilla";

interface PaymentStore {
	open: boolean;
	editValues: CreateVendorsWithAddressDto | null;
	setOpenVendorsForm: (open: boolean) => void;
	updateVendors: (vendors: CreateVendorsWithAddressDto) => void;
}

export const useCreateVendorsStore = createStore<PaymentStore>((set) => ({
	open: false,
	editValues: null,
	setOpenVendorsForm: (open) => {
		set({ open, editValues: null });
	},
	updateVendors: (vendors) => {
		set({ editValues: vendors, open: true });
	},
}));
