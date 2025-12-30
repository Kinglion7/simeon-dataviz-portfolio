# Deployment Instructions

## Automated Deployment (Recommended)

The repository now includes a GitHub Actions workflow that automatically builds and deploys your site to GitHub Pages whenever you push to the `main` branch.

### Setup Steps:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the changes

2. **Push your changes:**
   ```bash
   git add .
   git commit -m "Deploy new React portfolio"
   git push origin main
   ```

3. **Monitor deployment:**
   - Go to the **Actions** tab in your repository
   - You'll see the "Deploy to GitHub Pages" workflow running
   - Once complete, your site will be live at `https://[username].github.io/simeon-dataviz-portfolio/`

## Manual Deployment (Alternative)

If you prefer to deploy manually:

1. Install dependencies:
```bash
npm install
```

2. Build the static site:
```bash
npm run build
```

3. The build output will be in the `dist/` folder. You can then:
   - Push the `dist/` folder to a `gh-pages` branch, or
   - Use a tool like `gh-pages` npm package to deploy

## Important Notes

- The build automatically copies `index.html` to `404.html` to support client-side routing on GitHub Pages
- All routes are configured with the base path `/simeon-dataviz-portfolio/`
- The existing `visualization/` folder is preserved and can be accessed at `/simeon-dataviz-portfolio/visualization-build/`

## Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173/simeon-dataviz-portfolio/`

