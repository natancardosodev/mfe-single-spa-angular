#!/bin/sh

if [ -f $CI_PROJECT_DIR/.env.local ]; then
    echo "Removendo $CI_PROJECT_DIR/.env.local";
    rm $CI_PROJECT_DIR/.env.local;
fi