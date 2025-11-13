# Fix for Jekyll Build Error

## Problem
GitHub Pages Jekyll build was failing with:
```
Liquid syntax error (line 50): Variable '{{a}' was not properly terminated
in visualization/node_modules/balanced-match/README.md
```

This happens because Jekyll tries to process all files in the repository, including `node_modules/`, which contains files with `{{` syntax that Jekyll interprets as Liquid templates.

## Solution Applied

1. **Created `_config.yml`** - This tells Jekyll to exclude:
   - `node_modules/` directories (all of them)
   - Source files in `visualization/` folder
   - Build configuration files

2. **Created `.gitignore`** - This prevents `node_modules/` from being committed in the future

## If node_modules is Already Committed

If `node_modules` is already in your git repository, you need to remove it:

```bash
# Remove node_modules from git tracking (but keep it locally)
git rm -r --cached visualization/node_modules

# Commit the removal
git commit -m "Remove node_modules from repository"

# Push the changes
git push
```

## Next Steps

1. Commit the new `_config.yml` and `.gitignore` files
2. If `node_modules` is committed, remove it using the commands above
3. Push your changes - the Jekyll build should now succeed

The `visualization-build/` folder (your built React app) will still be accessible and served by GitHub Pages, but Jekyll won't try to process the source files or node_modules.

