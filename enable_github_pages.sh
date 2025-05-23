#!/bin/bash

# This script enables GitHub Pages for the current repository
# It requires a GitHub personal access token with the 'repo' scope

# Check if GitHub token is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <github_token>"
  echo "Please provide a GitHub personal access token with 'repo' scope"
  exit 1
fi

TOKEN=$1

# Get repository information
REPO_URL=$(git config --get remote.origin.url)
if [[ $REPO_URL == *"github.com"* ]]; then
  if [[ $REPO_URL == *":"* ]]; then
    # SSH format: git@github.com:username/repo.git
    REPO_PATH=$(echo $REPO_URL | cut -d':' -f2 | sed 's/\.git$//')
  else
    # HTTPS format: https://github.com/username/repo.git
    REPO_PATH=$(echo $REPO_URL | sed 's/https:\/\/github.com\///' | sed 's/\.git$//')
  fi
else
  echo "Not a GitHub repository"
  exit 1
fi

# Extract username and repo name
USERNAME=$(echo $REPO_PATH | cut -d'/' -f1)
REPO_NAME=$(echo $REPO_PATH | cut -d'/' -f2)

echo "Enabling GitHub Pages for $USERNAME/$REPO_NAME"

# Enable GitHub Pages using the GitHub API
curl -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/$USERNAME/$REPO_NAME/pages \
  -d '{"source":{"branch":"gh-pages","path":"/"}}'

echo -e "\nGitHub Pages should now be enabled. It may take a few minutes to build."
echo "Your site should be available at: https://$USERNAME.github.io/$REPO_NAME/"
