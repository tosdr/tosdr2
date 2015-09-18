Template.registerHelper('isModerator', utils.isModerator);
Template.registerHelper('isVerified', utils.isVerified);

Template.registerHelper('currentUserEmailAddress', function() {
  return Meteor.user().emails[0].address;
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
