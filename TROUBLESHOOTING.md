# Troubleshooting Blank Screen on GitHub Pages

## Common Causes and Solutions

### 1. Check Browser Console
Open your browser's developer tools (F12) and check the Console tab for JavaScript errors. Common errors:
- `Failed to load resource` - Asset path issues
- `Cannot read property` - Runtime errors
- `Module not found` - Import issues

### 2. Verify Base Path
The app is configured with base path `/simeon-dataviz-portfolio/`. Make sure:
- Your repository name is exactly `simeon-dataviz-portfolio`
- The URL you're accessing is: `https://[username].github.io/simeon-dataviz-portfolio/`

### 3. Check Network Tab
In browser DevTools → Network tab:
- Look for failed requests (red)
- Check if JavaScript files are loading (should see `.js` files)
- Verify CSS files are loading

### 4. Verify Build Output
After deployment, check the Actions tab:
- Look for the "Verify build output" step
- Should see `✓ index.html exists` and `✓ 404.html exists`

### 5. Test Locally First
Before deploying, test the build locally:
```bash
npm run build
npm run preview
```
Visit `http://localhost:4173/simeon-dataviz-portfolio/` and verify it works.

### 6. Clear Browser Cache
Sometimes cached files cause issues:
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or clear browser cache completely

### 7. Check GitHub Pages Settings
- Go to repository Settings → Pages
- Source should be set to "GitHub Actions"
- Custom domain should be empty (unless you have one)

## If Still Not Working

1. Check the deployed files:
   - Go to your repository
   - Navigate to the Actions tab
   - Click on the latest workflow run
   - Check the "Upload artifact" step to see what files were uploaded

2. Verify the dist folder structure:
   - Should contain: `index.html`, `404.html`, `assets/` folder
   - Should contain: `visualization-build/` folder (from public/)

3. Check for JavaScript errors in the browser console - these will tell you exactly what's wrong.

