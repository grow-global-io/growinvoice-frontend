import React from "react";
import { FieldProps, getIn } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ListDto } from "../../models/ListDto";

export const AutocompleteField: React.FC<
	FieldProps & {
		label: string;
		required?: boolean;
		options: ListDto[];
		onValueChange?: (value: ListDto) => void;
		multiple?: boolean;
	}
> = ({ field, form, label, options, onValueChange, ...props }) => {
	const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);
	return (
		<FormControl fullWidth error={!!errorText}>
			{field.name && (
				<InputLabel sx={{ ml: -1.6 }} shrink htmlFor={field.name}>
					<Typography variant="h4" color="text.primary">
						{label?.toUpperCase()}
					</Typography>
				</InputLabel>
			)}
			<Autocomplete
				{...props}
				filterSelectedOptions
				id={field.name}
				options={options}
				onChange={(_, value) => {
					if (value) {
						if (Array.isArray(value)) {
							form.setFieldValue(
								field.name,
								value.map((v) => (v as ListDto)?.value),
							);
							if (form.values[field.name].length === 0) {
								onValueChange?.(value[0] as ListDto);
							} else {
								const data: ListDto[] = [];
								value.map((obj) => {
									if (!(form.values[field.name].indexOf(obj.value) !== -1)) {
										data.push(obj);
									}
								});
								onValueChange?.(data[0] as ListDto);
							}
						} else {
							form.setFieldValue(field.name, (value as ListDto)?.value);
							onValueChange?.(value as ListDto);
						}
					}
				}}
				renderOption={(props, option) => {
					return (
						<li {...props} key={option.value}>
							<Typography>{option.label}</Typography>
						</li>
					);
				}}
				renderInput={(params) => (
					<TextField
						placeholder={label ? `Enter ${label?.toLowerCase()}` : undefined}
						error={Boolean(errorText)}
						helperText={errorText}
						label={undefined}
						name={field.name}
						{...params}
					/>
				)}
				value={
					props.multiple
						? options.filter((option) => field.value?.includes(option.value)) ?? []
						: options.find((option) => option.value === field.value) ?? null
				}
			/>
		</FormControl>
	);
};
