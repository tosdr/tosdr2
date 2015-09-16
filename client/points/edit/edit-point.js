Template.editPoint.events({
  'submit form': function (event,template) {
    event.preventDefault();
    var updatedPoint = {
      services: $(template.find('#services')).val(),
      title: template.find('#titleField').value,
      topics: $(template.find('#topics')).val(),
      tosdr: {
        binding: true,
        point: $('input[name="point"]:checked').val(),
        tldr: template.find('#summaryField').value,
        sources: [template.find('#sourceField').value]
      }
    };
    console.log('Save point:', updatedPoint);
    Points.update(this._id, {$set: updatedPoint});
    Router.go('points');
  }
});
