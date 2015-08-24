Template.services.events({
  'click .deleteButton': function () {
    if (window.confirm('Do you really want to delete this Service?')) {
      Services.remove(this._id);
    }
  }
});

