# Deployment Notes for GitHub Pages

## What Was Done

1. **Built the React app** - The visualization has been built and output to `../visualization-build/`
2. **Configured base path** - Updated `vite.config.js` to use `/tswd-portfolio-templates/visualization-build/` as the base path
3. **Created portfolio page** - Added `fencing-visualization.md` with the write-up, original graphic, and embedded visualization
4. **Updated README** - Added a link to the new fencing visualization page

## Important: Base Path Configuration

The base path in `vite.config.js` is currently set to `/tswd-portfolio-templates/visualization-build/` based on the URL in your README.

**If your actual GitHub repository name is different**, you need to:

1. Update `visualization/vite.config.js` - Change the `base` property to match your repo name:
   ```js
   base: '/your-actual-repo-name/visualization-build/',
   ```

2. Rebuild the app:
   ```bash
   cd visualization
   npm run build
   ```

## File Structure

```
simeon-dataviz-portfolio/
├── visualization-build/          # Built React app (deploy this)
│   ├── index.html
│   └── assets/
├── fencing-visualization.md     # Portfolio page with write-up and embedded viz
├── visualization/               # Source code
│   ├── original_graphic.png
│   ├── write_up.md
│   └── ...
└── README.md                     # Updated with link to fencing visualization
```

## Next Steps

1. **Commit and push** all files including:
   - `visualization-build/` folder (the built app)
   - `fencing-visualization.md` (the portfolio page)
   - Updated `README.md`

2. **Verify GitHub Pages is enabled** in your repository settings

3. **Test the visualization** at:
   - `https://your-username.github.io/your-repo-name/fencing-visualization`
   - The embedded iframe should load the interactive map

## Troubleshooting

If the visualization doesn't load:

1. Check that `visualization-build/` folder is committed to the repo
2. Verify the base path in `vite.config.js` matches your repo name
3. Check browser console for 404 errors on asset files
4. Ensure GitHub Pages is serving from the `main` branch (or your default branch)

