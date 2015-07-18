var _ = lodash;

function isNotEmpty(string) {
  return string && /\S+/.test(string);
}

function getFieldValue(template, id) {
  return $(template.find('#' + id)).val();
}

function getFieldValues(template, selector) {
  return _.map(template.findAll(selector), 'value').filter(isNotEmpty);
}

function getRadioValue(template, name) {
  return template.find('input[name="' + name + '"]:checked').value;
}

function isModerator() {
  if (!Meteor.user()) {
    return false;
  }
  var roles = Meteor.user().roles;
  return !!(roles && roles.moderator);
}

function isVerified() {
  var user = Meteor.user();
  if (!user) {
    return false;
  }
  return user.emails.length && user.emails[0].verified
}

utils = {
  getFieldValue: getFieldValue,
  getRadioValue: getRadioValue,
  getFieldValues: getFieldValues,
  isModerator: isModerator,
  isVerified: isVerified
}

