import React from "react";
import Sidebar from "./Sidebar";

const ParentofSidebar = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Sidebar>{children}</Sidebar>
		</div>
	);
};

export default ParentofSidebar;
