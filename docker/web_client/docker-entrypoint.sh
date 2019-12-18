#!/bin/bash
set -e

echo "yarn install ..."
yarn install

echo "yarn dev ..."
yarn dev

exec "$@"
