#!/bin/sh

folder="$(dirname "$0")"
cd $folder

# string=$(ncu --reject "react* @types/react* prettier *jest*")
string=$(ncu)
reqsubstr=" match "
param=$1
valueparam="publish"

valueforced="force"

if [ -z "$param" ] ;then    
    param="test"
fi

if [ -z "${param##*$valueforced*}" ] ;then    
    string="forced"
    param="publish"
fi

PACKAGE_NAME=$(cat package.json \
    | grep name \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')

if [ -z "${string##*$reqsubstr*}" ] ;then    
    echo "****** $PACKAGE_NAME No requiere nueva version ******"
else
    if [ -z "${param##*$valueparam*}" ] ;then
        echo "****** Generando nueva version de: $PACKAGE_NAME ******"
        rimraf lib
        
        rimraf package-lock.json
    fi

    # ncu --reject "react* @types/react* prettier *jest*" -u
    ncu -u
    npm i --force

    if [ -z "${param##*$valueparam*}" ] ;then
        npm version patch --no-git-tag-version
        npm publish
    fi
fi