#!/bin/sh

if [ -e $NPM_BUILD ]; then
    echo "Build das dependências do projeto";
    npm run $NPM_BUILD;
fi
