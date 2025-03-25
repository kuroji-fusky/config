#!/bin/bash

read -p "[GIT] Email: " email
read -p "[GIT] Name: " name

git config --global user.email "$email"
git config --global user.name "$name"
git config --global color.ui true

echo "Git config setup done"

# Alias setup
echo "Setting up custom aliases"
. './bash/aliases.sh'

# Node stuff
echo "Installing nvm..."
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
nvm install stable
nvm alias default stable

echo "Installing node packages..."
node_pkgs=(
  yarn
  typescript
  concurrently
  prettier
)

npm install -g ${node_pkgs[@]}

# Python
echo "Installing python packages..."
pip_pkgs=(
  bs4
  requests
  opencv-python
  ipykernel
)

pip install ${pip_pkgs[@]}

echo "All set bitch"
