#!/usr/bin/env bash

if [[ $(git branch --show-current) == "main" ]]; then
    git checkout -B release
fi
