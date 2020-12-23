#!/bin/sh

if [ -f $CI_PROJECT_DIR/.env.test ]; then
    echo "Criando $CI_PROJECT_DIR/.env.local";
    cp $CI_PROJECT_DIR/.env.test $CI_PROJECT_DIR/.env.local;
fi