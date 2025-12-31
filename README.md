# @rehanqasimk/happy-new-year 🎉

A fun CLI tool that displays colorful ASCII fireworks and a Happy New Year message!

## Installation

```bash
npx @rehanqasimk/happy-new-year
```

## Usage

Simply run the command:

```bash
npx @rehanqasimk/happy-new-year
```

This will display colorful ASCII fireworks followed by a Happy New Year message from Rehan Qasim.

## Publishing to GitHub npm Registry

### Prerequisites

1. Create a GitHub Personal Access Token (PAT) with `read:packages` and `write:packages` permissions
2. Create a `.npmrc` file in your home directory (`~/.npmrc`) with:

```
@rehanqasimk:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Or create a `.npmrc` file in the project root with:

```
@rehanqasimk:registry=https://npm.pkg.github.com
```

And authenticate using:

```bash
npm login --scope=@rehanqasimk --registry=https://npm.pkg.github.com
```

### Publishing

1. Build the project:
```bash
npm run build
```

2. Publish to GitHub npm registry:
```bash
npm publish
```

The package is already configured to publish to GitHub npm registry via the `publishConfig` in `package.json`.

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

