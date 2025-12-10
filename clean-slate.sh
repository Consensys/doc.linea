#!/bin/bash
rm -rf package-lock.json node_modules .docusaurus build
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use
npm install
