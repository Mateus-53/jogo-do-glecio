import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        createHtmlPlugin({
            minify: true,
        }),
    ],
    css: {
        plugins: [tailwindcss()],
    },
});
