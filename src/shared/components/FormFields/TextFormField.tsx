import React, { useState } from "react";
import { FieldProps, getIn } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

export const TextFormField: React.FC<
	FieldProps & {
		label?: string;
		required?: boolean;
		type?: string;
	}
> = ({ field, form, label, ...props }) => {
	const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);
	const [hidePassword, setHidePassword] = useState(true);
	const handleClickHidePassword = () => setHidePassword((hide) => !hide);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<FormControl fullWidth error={!!errorText}>
			{label && (
				<InputLabel sx={{ ml: -1.6 }} shrink htmlFor={field.name}>
					<Typography variant="h4" color="text.primary">
						{label?.toUpperCase()}
					</Typography>
				</InputLabel>
			)}
			<TextField
				{...field}
				fullWidth
				id={field.name}
				error={!!errorText}
				placeholder={label ? `Enter ${label?.toLowerCase()}` : undefined}
				InputProps={{
					endAdornment: props.type === "password" && (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickHidePassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{hidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
							</IconButton>
						</InputAdornment>
					),
				}}
				{...props}
				type={
					props.type === "password" && hidePassword
						? "password"
						: props.type === "password" && !hidePassword
							? "text"
							: props.type
				}
				helperText={errorText}
				label={undefined}
				InputLabelProps={{
					shrink: true,
				}}
				hidden={true}
			/>
		</FormControl>
	);
};
