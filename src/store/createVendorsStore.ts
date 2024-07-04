import { createStore } from "zustand/vanilla";

interface PaymentStore {
	open: boolean;
	setOpenVendorsForm: (open: boolean) => void;
	invoiceId: string | null;
	setOpenVendorsFormWithInvoiceId: (open: boolean, invoiceId: string) => void;
}

export const useCreateVendorsStore = createStore<PaymentStore>((set) => ({
	open: false,
	invoiceId: null,
	setOpenVendorsForm: (open) => {
		set({ open });
	},
	setOpenVendorsFormWithInvoiceId: (open, invoiceId) => {
		set({ open, invoiceId });
	},
}));
