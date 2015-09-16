var fs = Npm.require('fs');
var path = Npm.require('path');

Meteor.publish('points', function () {
  return Points.find();
});
ReactiveTable.publish('reactivePoints', Points);
ReactiveTable.publish('reactiveServices', Services);
ReactiveTable.publish('reactiveTopics', Topics);

Meteor.publish('services', function () {
  return Services.find();
});

Meteor.publish('topics', function () {
  return Topics.find();
});

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId}, {fields: {roles: 1}});
  } else {
    this.ready();
  }
});

Accounts.config({
  sendVerificationEmail: true
});

Accounts.emailTemplates.from = "ToSDR edit application <automatic-emails@tosdr.org>";

Meteor.methods({
  publishToApi: function () {
    if (!utils.isModerator()) {
      console.log('not-authorized user tried to access publishToApi');
      throw new Meteor.Error("not-authorized");
    }

    console.log('Started export to file system ...');

    var baseDir = '/tmp/tosdr';

    exportTopicsToFileSystem(baseDir);
    exportServicesToFileSystem(baseDir);
    exportApprovedPointsToFileSystem(baseDir);

    console.log('Finished export to file system.');
  }
});

function exportCollectionToFileSystem(collection, baseDir, directoryName, mongoSelector) {
  var exportDir = path.join(baseDir, directoryName);
  mkdirp.sync(exportDir);

  collection.find(mongoSelector).forEach(function (collectionItem) {
    var writeStream = fs.createWriteStream(path.join(exportDir, (collectionItem.id || collectionItem._id) + '.json'), {flags: 'w'});
    writeStream.write(prettyStringify(withoutInternalAttributes(collectionItem)));
    writeStream.end();
  });
}

function withoutInternalAttributes(object) {
  return _.omit(object, '_id', 'approved');
}

function prettyStringify(object) {
  return JSON.stringify(object, undefined, 2);
}

function exportTopicsToFileSystem(baseDir) {
  console.log('Start to export topics ...');
  exportCollectionToFileSystem(Topics, baseDir, 'topics', {});
}

function exportServicesToFileSystem(baseDir) {
  console.log('Start to export services ...');
  exportCollectionToFileSystem(Services, baseDir, 'services', {});
}

function exportApprovedPointsToFileSystem(baseDir) {
  console.log('Start to export approved points ...');
  exportCollectionToFileSystem(Points, baseDir, 'points', {approved: true});
}
