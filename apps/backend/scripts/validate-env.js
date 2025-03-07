#!/usr/bin/env node

/**
 * This script validates that .env and .env.example files are in sync.
 * It ensures that all keys in .env.example exist in .env and vice versa.
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Paths to the environment files
const envPath = path.resolve(__dirname, '../.env');
const exampleEnvPath = path.resolve(__dirname, '../.env.example');

// Function to parse env file and return keys
function parseEnvFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const env = dotenv.parse(content);
    return Object.keys(env);
  } catch (error) {
    console.error(`Error reading ${filePath}: ${error.message}`);
    process.exit(1);
  }
}

// Get keys from both files
const envKeys = parseEnvFile(envPath);
const exampleEnvKeys = parseEnvFile(exampleEnvPath);

// Check for keys in .env.example that are missing in .env
const missingInEnv = exampleEnvKeys.filter(key => !envKeys.includes(key));

// Check for keys in .env that are missing in .env.example
const missingInExample = envKeys.filter(key => !exampleEnvKeys.includes(key));

// Report findings
let hasErrors = false;

if (missingInEnv.length > 0) {
  console.error('\n❌ The following keys are in .env.example but missing in .env:');
  missingInEnv.forEach(key => console.error(`  - ${key}`));
  hasErrors = true;
}

if (missingInExample.length > 0) {
  console.error('\n⚠️  The following keys are in .env but missing in .env.example:');
  missingInExample.forEach(key => console.error(`  - ${key}`));
  hasErrors = true;
}

if (hasErrors) {
  console.error('\n❌ Environment files are not in sync. Please update them accordingly.\n');
  process.exit(1);
} else {
  console.log('\n✅ Environment files are in sync!\n');
  process.exit(0);
}
