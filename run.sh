#!/bin/bash

if [! -f /importDone ]; then
  sh /import.sh &
fi

meteor --port 80
