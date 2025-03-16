#!/bin/bash

# Step 1: Install nvm and load it
echo "Installing nvm..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Step 2: Export NVM_DIR and load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# Step 3: Install Node.js version 20
echo "Installing Node.js version 20..."
nvm install 20

# Step 4: Install TypeScript
echo "Installing TypeScript..."
npm install -D typescript

# Step 5: Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Step 6: Run the development server
echo "Starting the development server..."
npm run dev