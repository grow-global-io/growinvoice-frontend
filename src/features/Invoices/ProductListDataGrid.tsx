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
	GridActionsCellItem,
	GridEventListener,
	GridRowId,
	GridRowModel,
	GridRowParams,
	MuiEvent,
} from "@mui/x-data-grid";
import { Grid, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import GridSelectField from "@shared/components/DataGridFields/GridSelectField";
import GridTextField from "@shared/components/DataGridFields/GridTextField";
import { useProductControllerFindAll } from "@api/services/product";
import { currencyFormatter } from "@shared/formatter";
import CreateProduct from "@features/Products/CreateProduct";

export default function FullFeaturedCrudGrid({
	rows,
	setRows,
	errorText,
	setErrorText,
}: {
	rows: GridRowsProp;
	setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>;
	errorText: string | undefined;
	setErrorText: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
	const [isRowEditing, setIsRowEditing] = React.useState(false);
	const productList = useProductControllerFindAll();

	React.useEffect(() => {
		const editingRows = Object.values(rowModesModel).filter(
			(row) => row.mode === GridRowModes.Edit,
		);
		setIsRowEditing(editingRows.length > 0);
	}, [rowModesModel]);

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (_, event) => {
		event.defaultMuiPrevented = true;
	};

	const handleRowEditStart = (_: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
		event.defaultMuiPrevented = true;
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (id: GridRowId) => () => {
		setErrorText(undefined);

		const row = rows.find((row) => row.id === id);
		if (!row?.product_id) {
			setErrorText("Product must be selected before saving.");
			return;
		}
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		if (rows.filter((row) => row.id !== id)?.length === 0) {
			setErrorText("At least one product is required");
		}
		setRows(rows.filter((row) => row.id !== id));
	};

	const handleCancelClick = (id: GridRowId) => () => {
		if (rows.filter((row) => row.id !== id)?.length === 0) {
			setErrorText("At least one product is required");
		}
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
		if (!newRow.product_id) {
			setErrorText("Product must be selected before saving.");
			return newRow;
		}

		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const handleAddRow = () => {
		setErrorText(undefined);
		const randomInRange = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
		const id = rows.length + 2 + randomInRange;
		setRows((oldRows) => [
			...oldRows,
			{
				id,
				product_id: "",
				quantity: "",
				price: "",
				total: "",
				isNew: true,
				isEditPosible: false,
				isEditble: true,
			},
		]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
		}));
	};

	const theme = useTheme();

	const columns: GridColDef[] = [
		{
			field: "product_id",
			headerName: "Product",
			flex: 1.5,
			editable: true,
			renderEditCell: (params) => {
				const handleProductChange = (event: SelectChangeEvent) => {
					const value = event.target.value as string;
					const selectedProduct = productList?.data?.find((product) => product.id === value);
					const updatedRows = rows.map((row) => {
						if (row.id === params.id) {
							return {
								...row,
								product_id: value,
								quantity: 1,
								price: selectedProduct?.price,
								total: selectedProduct?.price,
							};
						}
						return row;
					});
					setRows(updatedRows);

					params.api.setEditCellValue({
						id: params.id,
						field: "quantity",
						value: 1,
					});
					params.api.setEditCellValue({
						id: params.id,
						field: "price",
						value: productList?.data?.find((product) => product.id === value)?.price,
					});
					params.api.setEditCellValue({
						id: params.id,
						field: "total",
						value: productList?.data?.find((product) => product.id === value)?.price,
					});
				};
				return (
					<GridSelectField
						params={params}
						valueOptions={productList?.data?.map((product) => {
							return {
								value: product.id,
								label: product.name,
							};
						})}
						onChangeValue={handleProductChange}
						disabled={params.row.isEditPosible}
					/>
				);
			},
			renderCell: (params) => {
				const productName = productList?.data?.find((product) => product.id === params.value)?.name;
				return <Typography>{productName}</Typography>;
			},
		},
		{
			field: "quantity",
			headerName: "Quantity",
			flex: 0.8,
			editable: true,
			preProcessEditCellProps: (params) => {
				console.log(params, "params");
				const hasError = params.props.value < 1;
				return { ...params.props, error: hasError };
			},

			renderEditCell: (params) => {
				const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
					const value = parseInt(event.target.value, 10);
					if (value < 1) {
						setErrorText("Quantity should not be less than 0");
					} else {
						setErrorText("");
					}
					const price = productList?.data?.find(
						(product) => product.id === params.row.product_id,
					)?.price;
					params.api.setEditCellValue({
						id: params.id,
						field: "total",
						value: price ? Number(value) * price : 0,
					});
				};
				return (
					<GridTextField
						params={params}
						label="quantity"
						type="number"
						onChangeValue={onChangeValue}
						disabled={params.row.price === "" || params.row.product_id === ""}
					/>
				);
			},
			renderCell: (params) => {
				return <Typography>{params.value}</Typography>;
			},
		},
		{
			field: "price",
			headerName: "Price",
			flex: 0.8,
			editable: true,
			renderEditCell: (params) => (
				<GridTextField params={params} label="price" type="number" disabled={true} />
			),
			renderCell: (params) => {
				return (
					<Typography>
						{currencyFormatter(
							params.value,
							productList?.data?.find((product) => product.id === params.row.product_id)?.currency
								?.short_code ?? "USD",
						)}
					</Typography>
				);
			},
		},
		{
			field: "total",
			headerName: "Amount",
			flex: 0.8,
			editable: true,
			renderEditCell: (params) => (
				<GridTextField params={params} label="Amount" type="number" disabled={true} />
			),
			renderCell: (params) => {
				return (
					<Typography>
						{currencyFormatter(
							params.value,
							productList?.data?.find((product) => product.id === params.row.product_id)?.currency
								?.short_code ?? "USD",
						)}
					</Typography>
				);
			},
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
							key={0}
							icon={<SaveIcon />}
							label="Save"
							sx={{
								color: "primary.main",
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							key={1}
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
						key={0}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						key={1}
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
		<Box>
			<DataGrid
				sx={{
					minHeight: 300,
					"& .MuiDataGrid-columnHeaderTitleContainer": {
						fontSize: 14,
						fontWeight: "bold",
						color: theme.palette.text.primary,
					},
					"& .MuiDataGrid-cell": {
						fontSize: 18,
						color: theme.palette.text.primary,
						display: "flex",
						py: 1,
						alignItems: "center",
					},
					"& .MuiDataGrid-columnHeaderTitle": {
						fontWeight: 700,
					},
				}}
				rows={rows}
				columns={columns}
				editMode="row"
				getRowHeight={() => "auto"}
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStart={handleRowEditStart}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				slots={{
					toolbar: () => {
						return (
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									p: 2,
									borderBottom: "1px solid",
									borderColor: "divider",
								}}
							>
								<Typography variant="h5">Add Products:</Typography>
								<CreateProduct />
							</Box>
						);
					},
					footer: () => {
						return (
							<Grid
								container
								py={2}
								sx={{
									backgroundColor: "custom.tableHeaderBgColor",
								}}
							>
								<Grid item xs={12} display="flex" justifyContent="center">
									<Button
										variant="contained"
										startIcon={<AddIcon />}
										onClick={handleAddRow}
										disabled={isRowEditing}
									>
										Add record
									</Button>
								</Grid>
							</Grid>
						);
					},
				}}
				slotProps={{
					toolbar: { setRows, setRowModesModel },
				}}
			/>
			{errorText && <Typography color="error">{errorText}</Typography>}
		</Box>
	);
}
