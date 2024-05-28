import { create } from "zustand";

interface ConfirmDialogStore {
	open: boolean;
	title: string;
	message: string;
	result?: boolean;
	confirmButtonText: string;
	cancelButtonText: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	cleanUp: () => void;
}

export const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
	open: false,
	title: "Are you sure?",
	message: "",
	confirmButtonText: "Confirm",
	cancelButtonText: "Cancel",
	cleanUp() {
		set({
			title: "Are you sure?",
			open: false,
			message: "",
			onConfirm: undefined,
			onCancel: undefined,
		});
	},
}));
