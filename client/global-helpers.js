Template.registerHelper('isModerator', utils.isModerator);

Template.registerHelper('currentUserEmailAddress', function() {
  return Meteor.user().emails[0].address;
});

