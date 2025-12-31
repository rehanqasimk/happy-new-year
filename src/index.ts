#!/usr/bin/env node

/**
 * @rehanqasimk/happy-new-year
 * 
 * A fun CLI tool that displays ASCII fireworks and a Happy New Year message.
 * 
 * Fireworks animation inspired by firew0rks:
 * https://github.com/addyosmani/firew0rks
 * 
 * Original work by Addy Osmani
 */

import * as fs from 'fs';
import * as path from 'path';

// Get directory where package is installed
// In CommonJS, __dirname is available at runtime
// We need to handle it for TypeScript compilation
let packageRoot: string;
try {
  // @ts-ignore - __dirname exists at runtime in CommonJS
  packageRoot = path.resolve(__dirname, '..');
} catch {
  // Fallback for TypeScript compilation check
  packageRoot = path.resolve(process.cwd(), '..');
}
const fireworksPath = path.join(packageRoot, 'fireworks');

// Read all fireworks frames
const textFiles: string[] = [];
let numFound = 0;
let filesExist = true;

while (filesExist) {
  const fileName = path.join(fireworksPath, numFound + ".txt");
  
  if (fs.existsSync(fileName)) {
    textFiles.push(fs.readFileSync(fileName, 'utf8'));
    numFound++;
  } else {
    filesExist = false;
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function playAnimation() {
  if (textFiles.length === 0) {
    console.log("Fireworks animation files not found");
    return;
  }

  let first = true;
  // Calculate number of lines to move up based on first frame
  const numLines = textFiles[0].split('\n').length;
  const backspaceAdjust = '\x1b[A'.repeat(numLines);

  // Play animation for 2 loops (can be adjusted)
  const loops = 2;
  for (let i = 0; i < loops; i++) {
    for (const frame of textFiles) {
      if (!first) {
        process.stdout.write(backspaceAdjust);
      }
      
      process.stdout.write(frame);
      
      first = false;
      await sleep(50); // 0.05 seconds between frames
    }
  }
}

function showMessage() {
  // ANSI color codes
  const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    // Bright colors
    brightRed: '\x1b[91m',
    brightGreen: '\x1b[92m',
    brightYellow: '\x1b[93m',
    brightBlue: '\x1b[94m',
    brightMagenta: '\x1b[95m',
    brightCyan: '\x1b[96m',
  };

  // Big ASCII art for "HAPPY NEW YEAR"
  const bigText = [
    '██╗  ██╗ █████╗ ██████╗ ██████╗ ██╗   ██╗    ███╗   ██╗███████╗██╗    ██╗    ██╗   ██╗███████╗ █████╗ ██████╗ ',
    '██║  ██║██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝    ████╗  ██║██╔════╝██║    ██║    ╚██╗ ██╔╝██╔════╝██╔══██╗██╔══██╗',
    '███████║███████║██████╔╝██████╔╝ ╚████╔╝     ██╔██╗ ██║█████╗  ██║ █╗ ██║     ╚████╔╝ █████╗  ███████║██████╔╝',
    '██╔══██║██╔══██║██╔═══╝ ██╔══██╗  ╚██╔╝      ██║╚██╗██║██╔══╝  ██║███╗██║      ╚██╔╝  ██╔══╝  ██╔══██║██╔══██╗',
    '██║  ██║██║  ██║██║     ██║  ██║   ██║       ██║ ╚████║███████╗╚███╔███╔╝       ██║   ███████╗██║  ██║██║  ██║',
    '╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝        ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝',
  ];

  const colorSequence = [
    colors.brightRed,
    colors.brightYellow,
    colors.brightGreen,
    colors.brightCyan,
    colors.brightBlue,
    colors.brightMagenta,
  ];

  console.log('\n');
  
  // Print big colorful text
  bigText.forEach((line, index) => {
    const color = colorSequence[index % colorSequence.length];
    console.log(color + line + colors.reset);
  });

  console.log('\n');
  
  // Fancy border and message
  const borderColor = colors.brightCyan;
  const textColor = colors.brightYellow;
  const nameColor = colors.brightMagenta;
  const sparkle = '✨';
  
  console.log(borderColor + '╔' + '═'.repeat(70) + '╗' + colors.reset);
  console.log(borderColor + '║' + ' '.repeat(70) + '║' + colors.reset);
  
  const message = '🎉 HAPPY NEW YEAR! 🎉';
  const padding = Math.floor((70 - message.length) / 2);
  console.log(
    borderColor + '║' + colors.reset + 
    ' '.repeat(padding) + 
    textColor + colors.bright + message + colors.reset + 
    ' '.repeat(70 - padding - message.length) + 
    borderColor + '║' + colors.reset
  );
  console.log(borderColor + '║' + ' '.repeat(70) + '║' + colors.reset);
  console.log(borderColor + '╚' + '═'.repeat(70) + '╝' + colors.reset);
  
  console.log('\n');
  
  // Simple text for "FROM REHAN QASIM" in a bordered box
  console.log(borderColor + '╔' + '═'.repeat(70) + '╗' + colors.reset);
  console.log(borderColor + '║' + ' '.repeat(70) + '║' + colors.reset);
  
  const fromMessage = 'FROM REHAN QASIM';
  const fromPadding = Math.floor((70 - fromMessage.length) / 2);
  console.log(
    borderColor + '║' + colors.reset + 
    ' '.repeat(fromPadding) + 
    nameColor + colors.bright + fromMessage + colors.reset + 
    ' '.repeat(70 - fromPadding - fromMessage.length) + 
    borderColor + '║' + colors.reset
  );
  
  console.log(borderColor + '║' + ' '.repeat(70) + '║' + colors.reset);
  console.log(borderColor + '╚' + '═'.repeat(70) + '╝' + colors.reset);
  
  console.log('\n');
}

// Main execution
async function main() {
  await playAnimation();
  showMessage();
}

main();