function isModerator(userId) {
  if (!userId) {
    return false;
  }
  return utils.isModerator();
}

function isSubmittedByCurrentUser(userId, insertedObject) {
  return insertedObject && insertedObject.submittedBy === userId;
}

// https://github.com/tosdr/tosdr.org/wiki/Specification:-points
Points = new Meteor.Collection('points');

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
