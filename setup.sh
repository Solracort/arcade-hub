#!/bin/bash

# Arcade Hub Project Setup Script
# This script initializes the development environment

echo "🎮 Arcade Hub - Setup Script"
echo "============================"

# Check Node.js version
echo "✓ Checking Node.js version..."
node --version

# Check npm version
echo "✓ Checking npm version..."
npm --version

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if everything is ok
if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Setup complete!"
  echo ""
  echo "Next steps:"
  echo "  1. npm start     - Start development server"
  echo "  2. npm run build - Build for production"
  echo ""
  echo "🚀 Ready to arcade!"
else
  echo "❌ Setup failed. Please check the errors above."
  exit 1
fi
