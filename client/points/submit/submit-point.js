Template.submitPoint.events({
  'submit form': function (event,template) {
    event.preventDefault();
    // TODO: Here I have a lots of questions
    var newPoint = {
      services: $(template.find('#services')).val(),
      title: template.find('#titleField').value,
      topics: $(template.find('#topics')).val(),
      tosdr: {
        binding: true, // TODO: Set point binding, but how?
        point: $('input[name="point"]:checked').val(),
        tldr: template.find('#summaryField').value,
        sources: [template.find('#sourceField').value]
      },
      approved: false,
      submittedBy: Meteor.userId(),
      subbmittedTimestamp: new Date().getTime(),
    };
    console.log('Save new point:', newPoint);
    Points.insert(newPoint);
    Router.go('points');
  },
  'click .signoutButton': function (event) {
    event.preventDefault();
    Meteor.logout();
  }
})

