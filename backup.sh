#!/bin/bash

cd /data
mongodump --port 81;
git config --local user.email "backups@edit.tosdr.org"
git config --local user.name "backup script inside edit.tosdr.org container"
git config --local defaul.push current
git add .
git commit -am"backup @ edit.tosdr.org `date`"
