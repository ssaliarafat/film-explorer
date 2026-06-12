import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        movie: resolve(__dirname, "src/movie/index.html"),
        favorites: resolve(__dirname, "src/favorites/index.html"),
      },
    },
  },
});