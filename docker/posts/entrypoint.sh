#!/usr/bin/env sh

export $(cat .env | xargs)

case $ENV in
 prod) yarn install --only=production ;;
    *) yarn install ;;
esac

nest start --watch posts