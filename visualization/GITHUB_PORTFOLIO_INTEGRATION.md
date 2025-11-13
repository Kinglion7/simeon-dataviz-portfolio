# How to Embed the US Fencing Map in a GitHub Portfolio

## Option 1: React-Based Portfolio (Recommended)

If your portfolio is built with React (Next.js, Create React App, Vite, etc.):

### Steps:

1. **Copy the component file** to your portfolio project:
   ```
   your-portfolio/
   ├── components/
   │   └── USFencingMap.jsx
   ```

2. **Install dependencies** in your portfolio:
   ```bash
   npm install react react-dom react-leaflet leaflet
   npm install -D tailwindcss postcss autoprefixer
   ```

3. **Import and use** in any page:
   ```jsx
   import USFencingMap from './components/USFencingMap';
   
   export default function ProjectsPage() {
     return (
       <div>
         <h1>My Projects</h1>
         <USFencingMap />
       </div>
     );
   }
   ```

4. **Ensure Tailwind CSS is configured** in your portfolio (if not already):
   - Add Tailwind directives to your CSS file
   - Configure `tailwind.config.js` to include the component path

---

## Option 2: Standalone Build + iframe Embed

Build the map as a standalone app and embed it via iframe:

### Steps:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the build** to:
   - GitHub Pages (from this repo)
   - Netlify (free)
   - Vercel (free)
   - Any static hosting

3. **Embed in your portfolio** (HTML):
   ```html
   <iframe 
     src="https://your-username.github.io/us-fencing-map/" 
     width="100%" 
     height="600px"
     frameborder="0"
     style="border-radius: 8px;"
   ></iframe>
   ```

---

## Option 3: GitHub Pages Deployment

Deploy this project directly to GitHub Pages:

### Steps:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://your-username.github.io/visualization"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Link to it** from your portfolio:
   ```markdown
   [US Fencing Divisions Map](https://your-username.github.io/visualization)
   ```

---

## Option 4: CodeSandbox/StackBlitz Embed

Host on CodeSandbox and embed:

1. **Create a CodeSandbox**:
   - Go to codesandbox.io
   - Import this GitHub repo
   - It will auto-detect Vite + React

2. **Get embed code**:
   ```html
   <iframe 
     src="https://codesandbox.io/embed/your-sandbox-id?view=preview"
     width="100%"
     height="600px"
     frameborder="0"
   ></iframe>
   ```

---

## Option 5: Static HTML Portfolio (No React)

If your portfolio is plain HTML/CSS/JS:

### Option A: Use React via CDN (Simple but limited)

```html
<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/react-leaflet/dist/react-leaflet.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
</head>
<body>
  <div id="fencing-map"></div>
  <script>
    // You'd need to bundle/compile the component first
    // This is complex - Option B is better
  </script>
</body>
</html>
```

### Option B: Link to Deployed Version (Easiest)

Just link to the deployed version:
```html
<a href="https://your-username.github.io/visualization" target="_blank">
  <img src="map-screenshot.png" alt="US Fencing Map" />
  View Interactive Map →
</a>
```

---

## Recommended Approach

**For most portfolios**: Use **Option 1** (React-based) or **Option 2** (iframe embed).

**Quickest setup**: **Option 3** (GitHub Pages) - deploy this repo and link to it.

---

## Notes

- **Leaflet CSS**: Make sure Leaflet CSS is loaded (it's in the component but may need global import)
- **Tailwind**: If your portfolio doesn't use Tailwind, you'll need to add it or convert classes to regular CSS
- **Responsive**: The map is already responsive with `h-[70vh]` - adjust as needed for your layout

