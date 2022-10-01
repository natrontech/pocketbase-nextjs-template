#!/usr/bin/env bash

# get arguments
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    echo "Usage: bump-version.sh <major|minor|patch>"
    exit 1
fi

old_version="v0.0.0"
version="v0.0.0"
# get the git tag in the format of v1.0.0 if it exists
git_tag=$(git describe --tags --abbrev=0 2>/dev/null)

replace_version() {
    if [ -n "$git_tag" ]; then
        version=$(echo $git_tag | sed 's/^v//')
        old_version=$version
    fi

    if [ "$1" == "major" ]; then
        # bump major version to vx+1.x.x
        version=$(echo $version | awk -F. '{$1=$1+1; $2=0; $3=0; OFS="."; printf "v%s.%s.%s", $1,$2,$3}')
    elif [ "$1" == "minor" ]; then
        # bump minor version to vx.x+1.x
        version=$(echo $version | awk -F. '{$2=$2+1; $3=0; OFS="."; printf "v%s.%s.%s", $1,$2,$3}')
    elif [ "$1" == "patch" ]; then
        # bump patch version to vx.x.x+1
        version=$(echo $version | awk -F. '{$3=$3+1; OFS="."; printf "%s.%s.%s", $1,$2,$3}')
    fi
}

# if the git tag exists then bump the version by argument (major, minor, patch)
replace_version $1

# color red
RED='\033[0;31m'
echo "${RED}Bumping version from $old_version to $version"
WHITE='\033[0m'
echo "${WHITE}"
echo "============================="
echo "Accept the changes? (y/n)"
read -r answer

if [ "$accept" == "y" ]; then
    # replace VERSION?=0.0.0 in ../Makefile
    sed -i '' "s/VERSION?=$old_version/VERSION?=$version/g" ../Makefile


    # replace version in package.json
    sed -i '' "s/\"version\": \"$old_version\"/\"version\": \"$version\"/g" ../web/app/package.json

    # replace in go.mod
    sed -i '' "s/version $old_version/version $version/g" ../go.mod

else
    echo "Aborted"
    exit 1
fi

# function to replace the version in the file with the new version
