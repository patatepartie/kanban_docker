#!/bin/bash

MODULES_DIR=/kanban/node_modules
if [ "$(ls -A ${MODULES_DIR} 2> /dev/null)" ]; then
    echo "'${MODULES_DIR}' not empty. Skipping npm install"
else
   npm install
fi

CMD=$1
shift
exec ${CMD} $@