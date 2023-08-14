import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			external: [
				"recorder-js",
				"lamejs", // Add any other external dependencies here
			],
		},
	},
});
