#!/bin/bash

MODULES_DIR=/kanban/node_modules
if [ ! "$(ls -A ${MODULES_DIR} 2> /dev/null)" ]; then
   echo "'${MODULES_DIR}' empty. Running npm install"
   npm install
fi

CMD=$1
shift
exec ${CMD} $@