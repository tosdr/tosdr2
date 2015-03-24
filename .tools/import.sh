#!/bin/sh

# This script imports all valid points, servics and topics from ../../tosdr-build/src
# First you must start meteor

# You can clean all existing points, services and topics before starting the import by:
#  meteor mongo
#  db.points.remove();db.services.remove();db.topics.remove();

MONGO_SERVER="localhost:81"

node prepare-import.js
mongoimport -h $MONGO_SERVER --db meteor --collection topics --jsonArray --file /tmp/topics.json
mongoimport -h $MONGO_SERVER --db meteor --collection services --jsonArray --file /tmp/services.json
mongoimport -h $MONGO_SERVER --db meteor --collection points --jsonArray --file /tmp/points.json
