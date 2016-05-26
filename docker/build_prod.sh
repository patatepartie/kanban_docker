#!/usr/bin/env bash

SCRIPT_PATH=$(dirname "$0")
ROOT="${SCRIPT_PATH}/.."

docker build -t kanban-build -f docker/prod/Dockerfile.build ${ROOT}
docker run --rm kanban-build | docker build -t kanban -