import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{
				find: /^@mui\/icons-material\/(.*)/,
				replacement: "@mui/icons-material/esm/$1",
			},
		],
	},
	build: {
		rollupOptions: {
			output: {
				format: "es", // Ensures the build output format is ES module
			},
		},
	},
});
