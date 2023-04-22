#!/usr/bin/env sh

set -e

echo "🏗️    Copying over .env.example into .env"
cp .env.example .env

echo ""

echo "🏗️    Correcting node version"
source ~/.nvm/nvm.sh
nvm install
nvm use

echo ""

echo "🏗️    Installing git-mob..."
npm i -g git-mob
cp .git-coauthors ~/.git-coauthors

echo ""

echo "🏗️    Installing project dependencies & precommit setup"
npm ci
npm run prepare:dev

echo ""

echo "======================================"
echo "🎉    Setup completed!"
echo "Don't forget to fill in the right values for your .env file"
echo ""
echo "Now start developing by running:"
echo ""
echo "To run all tests: 'npm test'"
echo "To run the app: 'npm run build && npm start'"
echo ""
echo "Start pairing & adding your pairs as coauthors using 'git mob'!"
echo "Add your pairs to your .git-coauthor file to get started."
echo "======================================"