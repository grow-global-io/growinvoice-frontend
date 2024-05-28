import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useTabs = (searchParam = "tab") => {
	const [tabValue, setTabValue] = React.useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		const tab = query.get(searchParam);
		if (tab && !isNaN(parseInt(tab))) {
			setTabValue(parseInt(tab));
		}
	}, []);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
		navigate(`?tab=${newValue}`);
	};

	return {
		tabValue,
		handleChange,
		setTabValue,
	};
};
