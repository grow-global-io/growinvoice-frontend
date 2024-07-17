import { createStore } from "zustand/vanilla";

interface NotificationStore {
	open: boolean;
	setOpenNotificationForm: (open: boolean) => void;
}

export const useCreateNotificationStore = createStore<NotificationStore>((set) => ({
	open: false,
	setOpenNotificationForm: (open) => {
		set({ open });
	},
}));
