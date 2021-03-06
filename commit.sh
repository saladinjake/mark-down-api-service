#!/bin/bash

# Configuration
USER_NAME="saladinjake"
USER_EMAIL="juwavictor@gmail.com"

# Set local git config
git config user.name "$USER_NAME"
git config user.email "$USER_EMAIL"

# Function to create a backdated commit
# Usage: ./commit.sh "YYYY-MM-DD HH:MM:SS" "Commit message"
backdated_commit() {
    local DATE="$1"
    local MSG="$2"
    
    echo "Creating commit: '$MSG' at $DATE"
    
    export GIT_AUTHOR_DATE="$DATE +0100"
    export GIT_COMMITTER_DATE="$DATE +0100"
    
    git add .
    git commit -m "$MSG"
    
    unset GIT_AUTHOR_DATE
    unset GIT_COMMITTER_DATE
}

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 \"YYYY-MM-DD HH:MM:SS\" \"Commit message\""
    exit 1
fi

backdated_commit "$1" "$2"
