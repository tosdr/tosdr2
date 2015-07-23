#!/bin/bash -eu

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# This script imports all valid points, services and topics from /tosdr-build/src
# First you must start meteor

# You can clean all existing points, services and topics before starting the import by:
#  meteor mongo
#  db.points.remove();db.services.remove();db.topics.remove();

: ${MONGO_SERVER:=db:27017}

node ${DIR}/prepare-import.js
mongoimport -h $MONGO_SERVER --db meteor --collection topics --jsonArray --file /tmp/topics.json
mongoimport -h $MONGO_SERVER --db meteor --collection services --jsonArray --file /tmp/services.json
mongoimport -h $MONGO_SERVER --db meteor --collection points --jsonArray --file /tmp/points.json
