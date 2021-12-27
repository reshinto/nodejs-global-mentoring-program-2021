#!/usr/bin/env bash
set -x

SCRIPTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

npx newman run $SCRIPTDIR/module-7-homework-6.postman_collection.json \
  --delay-request 500