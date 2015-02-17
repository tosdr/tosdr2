#!/bin/bash

if [! -f /importDone ]; then
  sh /tosdr2/import.sh &
fi

meteor --port 80
