import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
	GridRowsProp,
	GridRowModesModel,
	GridRowModes,
	DataGrid,
	GridColDef,
	GridToolbarContainer,
	GridActionsCellItem,
	GridEventListener,
	GridRowId,
	GridRowModel,
	GridRowEditStopReasons,
	GridSlots,
} from "@mui/x-data-grid";
import { randomId, randomArrayItem } from "@mui/x-data-grid-generator";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid } from "@mui/material";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => randomArrayItem(roles);

const initialRows: GridRowsProp = [
	{
		id: randomId(),
		product: "",
		quantity: "",
		price: "",
		amount: "",
		role: randomRole(),
	},
	{
		id: randomId(),
		product: "",
		quantity: "",
		price: "",
		amount: "",
		role: randomRole(),
	},
];

interface EditToolbarProps {
	setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
	setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

function EditToolbar(props: EditToolbarProps) {
	const { setRows, setRowModesModel } = props;

	const handleClick = () => {
		const id = randomId();
		setRows((oldRows) => [...oldRows, { id, product: "", quantity: "", isNew: true }]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: "product" },
		}));
	};

	return (
		<GridToolbarContainer>
			<Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
				Add record
			</Button>
		</GridToolbarContainer>
	);
}

const validationSchema = Yup.object().shape({
	product: Yup.string().required("Product is required"),
	quantity: Yup.number().required("Quantity is required").positive("Quantity must be positive"),
	price: Yup.number().required("Price is required").positive("Price must be positive"),
	amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
});

export default function FullFeaturedCrudGrid() {
	const options = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
	];
	const [rows, setRows] = React.useState(initialRows);
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		setRows(rows.filter((row) => row.id !== id));
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = rows.find((row) => row.id === id);
		if (editedRow!.isNew) {
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	const processRowUpdate = (newRow: GridRowModel) => {
		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns: GridColDef[] = [
		{
			field: "product",
			headerName: "Product",
			flex: 1.5,
			editable: true,
			renderEditCell: () => (
				<Grid sm={10}>
					<Field
						name="product"
						component={AutocompleteField}
						options={options}
						placeholder="Select or add a product"
					/>
				</Grid>
			),
		},
		{
			field: "quantity",
			headerName: "Quantity",
			flex: 0.8,
			editable: true,
			renderEditCell: () => (
				<Grid sm={10}>
					<Field name="quantity" component={TextFormField} type="number" />
				</Grid>
			),
		},
		{
			field: "price",
			headerName: "Price",
			flex: 0.8,
			editable: true,
			renderEditCell: () => (
				<Grid sm={10}>
					<Field name="price" component={TextFormField} />
				</Grid>
			),
		},
		{
			field: "amount",
			headerName: "Amount",
			flex: 0.8,
			editable: true,
			renderEditCell: () => (
				<Grid sm={10}>
					<Field name="amount" component={TextFormField} />
				</Grid>
			),
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			flex: 0.5,
			cellClassName: "actions",
			getActions: ({ id }) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							sx={{
								color: "primary.main",
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

	return (
		<Box sx={{ flex: 1 }}>
			<Formik
				initialValues={{ product: "", quantity: "", price: "", amount: "" }}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					// Handle form submission
					console.log(values);
				}}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<Box
							sx={{
								height: "auto",
								width: "100%",
								"& .actions": {
									color: "text.secondary",
								},
								"& .textPrimary": {
									color: "text.primary",
								},
							}}
						>
							<DataGrid
								rows={rows}
								columns={columns}
								editMode="row"
								hideFooterPagination
								rowModesModel={rowModesModel}
								onRowModesModelChange={handleRowModesModelChange}
								onRowEditStop={handleRowEditStop}
								processRowUpdate={processRowUpdate}
								slots={{
									toolbar: EditToolbar as GridSlots["toolbar"],
								}}
								slotProps={{
									toolbar: { setRows, setRowModesModel },
								}}
							/>
						</Box>
					</Form>
				)}
			</Formik>
		</Box>
	);
}
