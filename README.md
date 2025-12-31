# @rehanqasimk/happy-new-year 🎉

A fun CLI tool that displays colorful ASCII fireworks and a Happy New Year message!

## Installation

This package is published to both **npm registry** and **GitHub Packages**. You can use either one!

### From npm Registry (Easiest - No configuration needed!)

```bash
npx @rehanqasimk/happy-new-year
```

Or install globally:
```bash
npm install -g @rehanqasimk/happy-new-year
happy-new-year
```

### From GitHub Packages

**Step 1:** Configure npm to use GitHub Packages for the `@rehanqasimk` scope.

You can do this in one of two ways:

**Option A: Using npm config (Recommended)**
```bash
npm config set @rehanqasimk:registry https://npm.pkg.github.com
```

**Option B: Create/edit `~/.npmrc` file**
Add this line to your `~/.npmrc` file (create it if it doesn't exist):
```
@rehanqasimk:registry=https://npm.pkg.github.com
```

**Step 2:** Run the package
```bash
npx @rehanqasimk/happy-new-year
```

**Note:** Since this is a public package, you don't need authentication. However, if you encounter authentication errors, you can authenticate with:
```bash
npm login --scope=@rehanqasimk --registry=https://npm.pkg.github.com
```

## Usage

Simply run the command:

```bash
npx @rehanqasimk/happy-new-year
```

This will display colorful ASCII fireworks followed by a Happy New Year message from Rehan Qasim.

## Publishing

This package is published to both **GitHub Packages** and **npm registry**. The GitHub Actions workflow automatically publishes to both when you push a git tag.

### Automated Publishing (Recommended)

The package uses GitHub Actions to automatically build and publish to both registries when you push a git tag.

**Prerequisites:**
1. **GitHub Personal Access Token (PAT)** with `read:packages` and `write:packages` permissions
   - Add as secret: `ACCESS_TOKEN` in your GitHub repository settings
2. **npm Access Token** with publish permission
   - Get from: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Add as secret: `NPM_TOKEN` in your GitHub repository settings

**Steps to publish:**

1. Update the version in `package.json`:
```bash
# Edit package.json and update the version (e.g., "1.0.8")
```

2. Commit and push your changes:
```bash
git add package.json
git commit -m "Bump version to 1.0.8"
git push
```

3. Create and push a git tag (this triggers the automated publish workflow):
```bash
git tag v1.0.8
git push origin v1.0.8
```

The GitHub Actions workflow will automatically:
- Build the package
- Verify the tag version matches `package.json`
- Publish to **GitHub Packages**
- Publish to **npm registry**
- Create a GitHub release

**Note:** The tag version (e.g., `v1.0.8`) must match the version in `package.json` (e.g., `1.0.8`).

### Manual Publishing

If you prefer to publish manually:

#### Publish to GitHub Packages

1. Authenticate with GitHub Packages:
```bash
npm login --scope=@rehanqasimk --registry=https://npm.pkg.github.com
```

2. Build and publish:
```bash
npm run build
npm run publish:github
# or simply: npm publish
```

#### Publish to npm Registry

1. Authenticate with npm:
```bash
npm login
```

2. Build and publish:
```bash
npm run build
npm run publish:npm
# or: npm publish --registry=https://registry.npmjs.org
```

#### Publish to Both

To publish to both registries manually:
```bash
npm run build
npm run publish:github  # Publish to GitHub Packages
npm run publish:npm     # Publish to npm registry
```

## Development

### Running Locally

There are several ways to test the package locally:

**Method 1: Using npm scripts (easiest)**
```bash
# Build and run in one command
npm run dev

# Or build first, then run
npm run build
npm start
```

**Method 2: Direct node execution**
```bash
npm run build
node dist/index.js
```

**Method 3: Using npm link (test as if installed)**
```bash
# Build the project
npm run build

# Create a global symlink
npm link

# Now you can run it from anywhere
happy-new-year

# Or test with npx (if you have the package linked)
npx @rehanqasimk/happy-new-year

# When done testing, unlink
npm unlink -g @rehanqasimk/happy-new-year
```

**Method 4: Install from local directory**
```bash
# In another project or globally
npm install -g /path/to/happy-new-year

# Or in another project
npm install /path/to/happy-new-year
```

### Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Acknowledgments

This project uses fireworks animation frames inspired by [firew0rks](https://github.com/addyosmani/firew0rks) by [Addy Osmani](https://github.com/addyosmani). The firew0rks project is a JavaScript port of text art animations and provides amazing ASCII art animations for the terminal.

Special thanks to the original creators for their work on terminal animations!

## License

ISC

## Author

Rehan Qasim

