import { AlertProps } from "@mui/material";
import { useAlertStore } from "../../store/alert";

export class AlertService {
	private static _instance: AlertService;

	public static get instance(): AlertService {
		if (!AlertService._instance) {
			AlertService._instance = new AlertService();
		}
		return AlertService._instance;
	}

	private constructor() {}

	private showAlert(message: string, severity: AlertProps["severity"]): void {
		useAlertStore.getState().setAlert(true, message, severity);
	}

	public successMessage(message: string): void {
		this.showAlert(message, "success");
	}

	public errorMessage(message: string): void {
		this.showAlert(message, "error");
	}
}
