Template.curate.helpers({
  service: function() {
    return this._id;
  },
  points: function() {
    return Points.find({ services: this._id, 'tosdr.irrelevant': {'$exists': false} });
  }
});

Template.curate.events({
  'click li': function (event) {
    var point = this;
    Router.go('/points/edit/' + point._id);
  }
});
