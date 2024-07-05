import React from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function AppDialogFooter({
	onClickCancel,
	cancelButtonText = "Cancel",
	saveButtonText = "Save",
	saveButtonDisabled = false,
	cancelButtonDisabled = false,
	onSaveClick,
	children,
}: {
	onClickCancel: () => void;
	cancelButtonText?: string;
	saveButtonText?: string;
	saveButtonDisabled?: boolean;
	cancelButtonDisabled?: boolean;
	onSaveClick?: () => void;
	children?: React.ReactNode;
}) {
	return (
		<DialogActions
			sx={{
				display: "flex",
				justifyContent: "center",
				m: 0,
				p: 2,
			}}
		>
			{children}
			<Button
				variant="outlined"
				disabled={cancelButtonDisabled}
				color="secondary"
				onClick={onClickCancel}
			>
				{cancelButtonText}
			</Button>
			<Button
				variant="contained"
				disabled={saveButtonDisabled}
				color="primary"
				type="submit"
				onClick={() => {
					if (onSaveClick) onSaveClick();
				}}
			>
				{saveButtonText}
			</Button>
		</DialogActions>
	);
}
