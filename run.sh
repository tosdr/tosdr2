#!/bin/bash

meteor --port 80 &

sleep 30
cd .tools
sh ./import.sh

sleep 30
cd /data
while (true); do
  sleep 60;
  mongodump --port 3001;
done
