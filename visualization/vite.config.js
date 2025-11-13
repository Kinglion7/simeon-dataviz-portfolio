import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Update the base path to match your GitHub Pages URL structure
// If your repo is 'username/repo-name', use '/repo-name/visualization-build/'
// For example, if repo is 'cmustudent/tswd-portfolio-templates', the base should be:
export default defineConfig({
  plugins: [react()],
  base: '/tswd-portfolio-templates/visualization-build/',
  build: {
    outDir: '../visualization-build',
    emptyOutDir: true,
  },
})


