# Quick Setup Guide for GitHub Portfolio

## Easiest Method: Deploy to GitHub Pages

### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json
Add these scripts and homepage field:
```json
{
  "homepage": "https://your-username.github.io/visualization",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 3: Update vite.config.js for GitHub Pages
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/visualization/', // Change 'visualization' to your repo name
})
```

### Step 4: Deploy
```bash
npm run deploy
```

### Step 5: Link from Your Portfolio
```html
<!-- In your portfolio README or HTML -->
<a href="https://your-username.github.io/visualization" target="_blank">
  🗺️ US Fencing Divisions Interactive Map
</a>
```

Or embed as iframe:
```html
<iframe 
  src="https://your-username.github.io/visualization" 
  width="100%" 
  height="600px"
  style="border: none; border-radius: 8px;"
></iframe>
```

---

## Alternative: If Your Portfolio is React-Based

Just copy the component file and import it:

```jsx
// In your portfolio project
import USFencingMap from './components/USFencingMap';

function ProjectsPage() {
  return (
    <section>
      <h2>US Fencing Divisions Map</h2>
      <USFencingMap />
    </section>
  );
}
```

Make sure to install the same dependencies:
```bash
npm install react react-dom react-leaflet leaflet
npm install -D tailwindcss postcss autoprefixer
```


