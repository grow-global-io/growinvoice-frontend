import * as React from "react";
import { ThemeOptions, createTheme, alpha } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { TransitionProps } from "@mui/material/transitions";
import { Box, Slide } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

// for datagrid search component
function QuickSearchToolbar() {
	return (
		<Box
			sx={{
				px: 1,
				pb: 0,
				float: "left",
			}}
		>
			<GridToolbarQuickFilter variant="outlined" />
		</Box>
	);
}

const themeOptions: ThemeOptions = {
	palette: {
		mode: "light",
		primary: {
			main: "rgba(13, 110, 253, 1)",
			contrastText: "#fff",
			light: "#31C4C3",
		},
		secondary: {
			main: "#0D6EFD",
			contrastText: "#fff",
			light: "#CFF1DE",
			dark: "#DB883F",
		},
		warning: {
			main: "#facea8",
		},
		grey: {
			"100": "#d1d1d1",
			"200": "#c1c1c1",
			"300": "#979797",
			"400": "#7c828a",
		},
		text: {
			secondary: "#0a97b7",
			primary: "#054c5c",
			disabled: "#99a1a1",
		},
		background: {
			paper: "#fff",
			default: "#fafafa",
		},
		action: {
			active: "#979797",
			activatedOpacity: 0.1,
			selected: "#C0EDED",
		},
	},
	typography: {
		fontFamily: ' "Poppins","Montserrat", "Helvetica", "Arial", sans-serif',
		fontSize: 14,
		h1: {
			fontSize: "2.5rem",
			fontWeight: "bold",
			lineHeight: "2.75rem",
			letterspacing: "0rem",
		},
		h2: {
			fontSize: "2rem",
			fontWeight: "normal",
			lineHeight: "2.2rem",
			letterspacing: "0rem",
		},
		h3: {
			fontSize: "1.5rem",
			fontWeight: "bold",
			lineHeight: "2.2rem",
			letterspacing: "1.15rem",
			textTransform: "uppercase",
		},
		h4: {
			fontSize: "1.1rem",
			fontWeight: "bold",
			lineHeight: "1.7rem",
			letterspacing: "0rem",
		},
		h5: {
			fontSize: "1rem",
			fontWeight: "bold",
			lineHeight: "1.7rem",
			letterspacing: "0rem",
		},
		h6: {
			fontSize: "0.85rem",
			fontWeight: "bold",
			lineHeight: "1rem",
			letterspacing: "0rem",
		},
		body1: {
			fontSize: "0.75rem",
			lineHeight: "1.7rem",
			fontWeight: "normal",
			letterspacing: "0rem",
		},
		body2: {
			fontSize: "0.6rem",
			fontWeight: "normal",
			lineHeight: "1.7rem",
			letterspacing: "0rem",
		},
		button: {
			fontSize: "0.8rem",
			fontWeight: "bolder",
			lineHeight: "1.15rem",
			textTransform: "uppercase",
			letterspacing: "2rem",
		},
	},
	components: {
		MuiTypography: {
			defaultProps: {
				color: "text.primary",
				fontSize: "body1",
				// textTransform: "capitalize",
			},
		},
		MuiAppBar: {
			styleOverrides: {
				colorInherit: {
					// backgroundImage: "linear-gradient(180deg, #8CEEED, #FBFEFD)",
					backgroundColor: "rgba(102, 209, 209, 0.1)",
					borderBottom: "2px solid #eceefe;",
					color: "#fff",
				},
			},
			defaultProps: {
				elevation: 0,
				color: "inherit",
			},
		},
		MuiButton: {
			defaultProps: {
				// disableElevation: true,
				sx: {
					borderRadius: 1,
					minWidth: 120,
					margin: "0px 8px",
					textTransform: "capitalize",
					// outlined variant
					"&.MuiButton-outlined": {
						borderWidth: 3,
						padding: "5px 20px",
					},
					// contained variant
					"&.MuiButton-contained": {
						padding: "6px 20px",
						fontSize: "14px",
						fontWeight: "500",
						lineHeight: "20px",
					},
				},
			},
		},
		MuiButtonGroup: {
			defaultProps: {
				size: "small",
			},
		},
		MuiCheckbox: {
			defaultProps: {
				size: "small",
			},
		},
		MuiFab: {
			defaultProps: {
				size: "small",
			},
		},
		MuiFormControl: {
			defaultProps: {
				size: "small",
				margin: "dense",
			},
		},
		MuiFormHelperText: {
			defaultProps: {
				margin: "dense",
			},
		},
		MuiIconButton: {
			defaultProps: {
				size: "small",
			},
		},
		MuiInputBase: {
			defaultProps: {
				size: "small",
				margin: "dense",
			},
		},
		MuiInputLabel: {
			defaultProps: {
				size: "small",
			},
		},
		MuiRadio: {
			defaultProps: {
				size: "small",
			},
		},
		MuiSwitch: {
			defaultProps: {
				size: "small",
			},
		},
		MuiTextField: {
			defaultProps: {
				size: "small",
				margin: "dense",
				sx(theme) {
					return {
						mb: theme.spacing(1),
						"label + &": {
							marginTop: theme.spacing(2),
						},
						"& .MuiTextField-root": {
							borderRadius: 8,
							position: "relative",
							// backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
							border: `0.5px solid ${theme.palette.text.secondary}`,
							fontSize: 16,
							padding: "10px 12px",
							transition: theme.transitions.create([
								"border-color",
								"background-color",
								"box-shadow",
							]),
							"&:focus": {
								boxShadow: `${alpha(theme.palette.text.secondary, 0.25)} 0 0 0 0.2rem`,
								borderColor: theme.palette.text.secondary,
							},
							"&::placeholder": {
								color: theme.palette.text.secondary,
								fontStyle: "italic",
								fontSize: 12,
							},
						},
					};
				},
			},
		},
		MuiAutocomplete: {
			defaultProps: {
				size: "small",
				sx(theme) {
					return {
						mb: theme.spacing(1),
						"label + &": {
							marginTop: theme.spacing(1),
						},
						"& .MuiAutocomplete-root": {
							borderRadius: 8,
							position: "relative",
							// backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
							border: `0.5px solid ${theme.palette.text.secondary}`,
							fontSize: 16,
							padding: "10px 12px",
							transition: theme.transitions.create([
								"border-color",
								"background-color",
								"box-shadow",
							]),
							"&:focus": {
								boxShadow: `${alpha(theme.palette.text.secondary, 0.25)} 0 0 0 0.2rem`,
								borderColor: theme.palette.text.secondary,
							},
							"&::placeholder": {
								color: theme.palette.text.secondary,
								fontStyle: "italic",
								fontSize: 12,
							},
						},
					};
				},
			},
		},
		MuiList: {
			defaultProps: {
				dense: true,
			},
		},
		MuiMenuItem: {
			defaultProps: {
				dense: true,
			},
		},
		MuiTable: {
			defaultProps: {
				size: "small",
			},
		},
		MuiCard: {
			defaultProps: {
				elevation: 2,
			},
		},
		MuiDialog: {
			defaultProps: {
				TransitionComponent: Transition,
			},
		},

		MuiAccordion: {
			defaultProps: {
				elevation: 0,
				disableGutters: true,
				square: true,
				sx(theme) {
					return {
						border: `1px solid ${theme.palette.divider}`,
						"&:not(:last-child)": {
							borderBottom: 0,
						},
						"&:before": {
							display: "none",
						},
					};
				},
			},
		},
		MuiAccordionSummary: {
			defaultProps: {
				expandIcon: <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "text.primary" }} />,
				sx(theme) {
					return {
						backgroundColor: theme.palette.primary.main,
						flexDirection: "row-reverse",
						"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
							transform: "rotate(90deg)",
						},
						"& .MuiAccordionSummary-content": {
							marginLeft: theme.spacing(1),
						},
					};
				},
			},
		},
		MuiAccordionDetails: {
			defaultProps: {
				sx(theme) {
					return {
						"& .MuiTabs-indicator": {
							backgroundColor: theme.palette.text.primary,
						},
					};
				},
			},
		},
		MuiTabs: {
			defaultProps: {
				sx(theme) {
					return {
						"& .MuiTabs-indicator": {
							backgroundColor: theme.palette.text.primary,
						},
					};
				},
			},
		},
		MuiTab: {
			defaultProps: {
				// root typography
				sx(theme) {
					return {
						fontSize: "0.7rem",
						color: "#979797",
						"&.Mui-selected": {
							color: theme.palette.text.primary,
						},
						// "&.Mui-focusVisible": {
						// 	backgroundColor: "#d1eaff",
						// },
					};
				},
			},
		},
		MuiListItemText: {
			defaultProps: {
				primaryTypographyProps: {
					// variant: "h6",
					fontSize: "0.8rem",
					fontWeight: "bold",
					color: "text.primary",
					textTransform: "capitalize",
					// lineHeight: 1,
				},
				secondaryTypographyProps: {
					// variant: "body2",
					color: "text.secondary",
					// lineHeight: 1,
				},
			},
		},
		MuiToggleButton: {
			defaultProps: {
				sx: {
					"&.Mui-selected": {
						color: "#3AB0C0",
						backgroundColor: "#D6F0F3",
					},
				},
			},
		},
		MuiAvatar: {
			defaultProps: {
				sx: {
					"&.MuiAvatar-root": {
						width: 40,
						height: 40,
						backgroundColor: "#c1c1c1",
					},
				},
			},
		},
		MuiDataGrid: {
			defaultProps: {
				components: { Toolbar: QuickSearchToolbar },
				pageSizeOptions: [10, 25, 50, 100],
				paginationModel: { page: 1, pageSize: 10 },
				checkboxSelection: false,
				sx(theme) {
					return {
						"& .MuiDataGrid-columnHeaderTitleContainer": {
							fontSize: 12,
							fontWeight: "bold",
							color: theme.palette.text.primary,
						},
						"& .MuiDataGrid-cell": {
							fontSize: 14,
							color: theme.palette.text.primary,
						},
						"& .MuiDataGrid-columnHeaderTitle": {
							fontWeight: 700,
						},
					};
				},
			},
		},
		MuiTableHead: {
			defaultProps: {
				sx: {
					"&.MuiTableHead-root": {
						fontSize: 16,
					},
				},
			},
		},
		MuiTableCell: {
			defaultProps: {
				sx: {
					"&.MuiTableCell-root": {
						fontSize: 14,
					},
				},
			},
		},
	},
};

export const theme = createTheme(themeOptions);
