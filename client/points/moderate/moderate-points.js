Template.moderatePoint.events({
  'click .approveButton': function () {
    Points.update(this._id, {
      $set: {approved: true}
    });
  },
  'click .deleteButton': function () {
    if (window.confirm('Do you really want to delete this point?')) {
      Points.remove(this._id);
    }
  }
});
