#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const npmrcPath = path.join(__dirname, '..', '.npmrc');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Save the original publishConfig
const originalPublishConfig = packageJson.publishConfig;

// Remove publishConfig temporarily
delete packageJson.publishConfig;

// Write the modified package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Check if .npmrc exists and save it
let originalNpmrc = null;
let npmrcExists = false;
if (fs.existsSync(npmrcPath)) {
  originalNpmrc = fs.readFileSync(npmrcPath, 'utf8');
  npmrcExists = true;
}

try {
  // Create a temporary .npmrc that overrides the scope registry to npm
  // Include npm token if available (for CI/CD)
  const npmToken = process.env.NPM_TOKEN || process.env.NODE_AUTH_TOKEN;
  let tempNpmrc = '@rehanqasimk:registry=https://registry.npmjs.org\n';
  if (npmToken) {
    tempNpmrc += `//registry.npmjs.org/:_authToken=${npmToken}\n`;
  }
  fs.writeFileSync(npmrcPath, tempNpmrc);
  
  // Publish to npm registry as public
  console.log('Publishing to npm registry as public...');
  execSync('npm publish --registry=https://registry.npmjs.org --access=public', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log('✅ Successfully published to npm registry!');
} catch (error) {
  console.error('❌ Failed to publish to npm registry:', error.message);
  process.exit(1);
} finally {
  // Restore the original publishConfig
  if (originalPublishConfig) {
    packageJson.publishConfig = originalPublishConfig;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  }
  
  // Restore or remove .npmrc
  if (npmrcExists && originalNpmrc) {
    fs.writeFileSync(npmrcPath, originalNpmrc);
  } else if (fs.existsSync(npmrcPath)) {
    // Remove the temp .npmrc we created
    fs.unlinkSync(npmrcPath);
  }
}

