import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Update the base path to match your GitHub Pages URL structure
// If your repo is 'username/repo-name', use '/repo-name/visualization-build/'
// Your repo is 'simeon-dataviz-portfolio', so the base is:
export default defineConfig({
  plugins: [react()],
  base: '/simeon-dataviz-portfolio/visualization-build/',
  build: {
    outDir: '../visualization-build',
    emptyOutDir: true,
  },
})


