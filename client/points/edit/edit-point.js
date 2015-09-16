Template.editPoint.events({
  'submit form': function (event,template) {
    event.preventDefault();
    var updatedPoint = {
      services: $(template.find('#services')).val(),
      title: template.find('#titleField').value,
      topics: $(template.find('#topics')).val(),
      tosdr: {
        score: template.find('#scoreField').value,
        case: template.find('#caseField').value,
        binding: $('input[name="binding"]').is(':checked'),
        disputed: $('input[name="disputed"]').is(':checked'),
        irrelevant: $('input[name="irrelevant"]').is(':checked'),
        point: $('input[name="point"]:checked').val(),
        tldr: template.find('#summaryField').value,
        sources: [template.find('#sourceField').value]
      }
    };
    console.log('Save point:', updatedPoint);
    Points.update(this._id, {$set: updatedPoint});
    this.updateModeration();
    Router.go('points');
  }
});
