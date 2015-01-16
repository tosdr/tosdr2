#!/bin/bash

meteor &

sleep 30
cd .tools
sh ./import.sh

sleep 30
cd /
while (true); do
  sleep 60;
  mongodump --port 3001;
done
