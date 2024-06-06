import { TextField } from "@mui/material";
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import React from "react";

const GridTextField = ({
	params,
	label,
	type = "text",
}: {
	params: GridRenderEditCellParams<any, any, any>;
	label: string;
	type?: React.HTMLInputTypeAttribute;
}) => {
	const apiRef = useGridApiContext();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		apiRef.current.setEditCellValue(
			{
				id: params.id,
				field: params.field,
				value: event.target.value,
			},
			event,
		);
	};

	return (
		<TextField
			placeholder={label}
			value={params.value}
			onChange={handleChange}
			fullWidth
			error={params.error}
			type={type}
		/>
	);
};

export default GridTextField;
