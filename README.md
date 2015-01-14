# ToS;DR 2
A web app to submit and review points about services for http://tosdr.org. <br/>
Written in JavaScript with help of the meteor framework (https://www.meteor.com). <br/>
Data is saved in a MongoDB. <br/>

## Current state

Highly experimental, incomplete, insecure and not scalable. <br/>
But a great start for 21 working hours :-)


## How to start in development mode

Install meteor:

```shell
curl https://install.meteor.com/ | sh
```

Cd into the project root directory (where this README is located) and enter:

```shell
meteor
```

Open [http://localhost:3000] (http://localhost:3000) in your browser.

You need to sign in to see something interesting.
You can sign in/up yourself with the menu in the top right corner.
Email addresses are currently not verified and "Forgot password ?" does not work.

## How to make a user to a moderator

The most functionality is hidden from normal users. Therefore you need to make one user to a moderator in order to see
all functionality.

First you need to open the mongo shell in parallel to the running meteor app.
```shell
meteor mongo
```
Then you need to find the correct user id and add the role

```javascript
db.users.find().pretty() // find _id
db.users.update({_id: 'USER_ID'},{$set: {roles: {moderator: true}}})
db.users.find().pretty() // should have roles attribute now
```
You can get the user of the current logged in user also in the browsers console by

```javascript
Meteor.userId()
```

## Import from [tosdr-build] (https://github.com/tosdr/tosdr-build)

Please see [.tools/import.sh](.tools/import.sh). You may need to run
`apt-get install mongodb-clients` or equivalent, for the mongoimport tool it uses.

## Publish/Export

As moderator you can export (=publish) points, services and topics to the file system.
Currently it's written to '/tmp/tosdr'. The exported files should be compatible with
the one imported from tosdr-build.
