function isModerator(userId) {
  if (!userId) {
    return false;
  }
  return utils.isModerator();
}

function isSubmittedByCurrentUser(userId, insertedObject) {
  return utils.isVerified() && insertedObject && insertedObject.submittedBy === userId;
}

// https://github.com/tosdr/tosdr.org/wiki/Specification:-points
Points = new Meteor.Collection('points');

Points.helpers ({
  updateModeration: function() {
    var point = this;
    var needModeration = !point.tosdr.disputed &&
      !point.tosdr.irrelevant &&
      point.tosdr.binding &&
      (
        !point.tosdr ||
        !point.tosdr.point ||
        typeof(point.tosdr.score) === 'undefined' ||
        !point.tosdr.tldr ||
        !point.services ||
        !point.topics ||
        !point.title
      )
     
    var updatedPoint = {
      needModeration: needModeration
    };
    console.log('Save point:', updatedPoint);
    Points.update(point._id, {$set: updatedPoint});
  }
});

if (Meteor.isServer) {
  Points.after.insert(function () {
    var point = this.transform();
    point.updateModeration();
  });
}

Points.allow({
  insert: isSubmittedByCurrentUser,
  update: isModerator,
  remove: isModerator
});

// https://github.com/tosdr/tosdr.org/wiki/Specification:-services
Services = new Meteor.Collection('services');

Services.allow({
  insert: isSubmittedByCurrentUser,
  update: isModerator,
  remove: isModerator
});

// https://github.com/tosdr/tosdr.org/wiki/Specification:-topics
Topics = new Meteor.Collection('topics');

Topics.allow({
  insert: isSubmittedByCurrentUser,
  update: isModerator,
  remove: isModerator
});
