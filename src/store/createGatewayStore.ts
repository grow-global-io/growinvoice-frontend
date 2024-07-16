import { GateWayDetailsDto } from "@api/services/models";
import { createStore } from "zustand/vanilla";

interface GateWayStoreStore {
	open: boolean;
	setOpenGateWayForm: (open: boolean) => void;
	editValues: GateWayDetailsDto | null;
	updateGateWay: (gateway: GateWayDetailsDto) => void;
}

export const useCreateGeteWayStore = createStore<GateWayStoreStore>((set) => ({
	open: false,
	editValues: null,
	setOpenGateWayForm: (open) => {
		set({ open, editValues: null });
	},
	updateGateWay: (gateway) => {
		set({ editValues: gateway, open: true });
	},
}));
