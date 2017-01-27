var path = Npm.require('path');
var AdmZip = Npm.require('adm-zip');

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

Meteor.publish('curate', function (serviceId) {
  return Points.find({ services: [ serviceId ] });
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

    var exportFile = path.join(process.env.PWD, '/public/data.zip');
    var zip = new AdmZip();
    addTopics(zip);
    addServices(zip);
    addPoints(zip);
    zip.writeZip(exportFile);
    console.log('Finished export to file system.');
  }
});

function exportCollectionToZip(collection, zip, directoryName, mongoSelector) {
  collection.find(mongoSelector).forEach(function (collectionItem) {
    zip.addFile(path.join(directoryName, (collectionItem.id || collectionItem._id) + '.json'),
        new Buffer(prettyStringify(withoutInternalAttributes(collectionItem))), '');
  });
}

function withoutInternalAttributes(object) {
  if (typeof object.id === 'undefined') {
    object.id = object._id;
  }
  return _.omit(object, '_id');
}

function prettyStringify(object) {
  return JSON.stringify(object, undefined, 2);
}

function addTopics(zip) {
  console.log('Start to export topics ...');
  exportCollectionToZip(Topics, zip, 'topics', {});
}

function addServices(zip) {
  console.log('Start to export services ...');
  exportCollectionToZip(Services, zip, 'services', {});
}

function addPoints(zip) {
  console.log('Start to export points ...');
  exportCollectionToZip(Points, zip, 'points', {/* approved: true */});
}
