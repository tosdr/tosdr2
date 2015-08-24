Template.topics.events({
  'click .deleteButton': function () {
    if (window.confirm('Do you really want to delete this Topic?')) {
      Topics.remove(this._id);
    }
  }
});

