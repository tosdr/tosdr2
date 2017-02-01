Template.curate.helpers({
  service: function() {
    return this._id;
  },
  points: function() {
    return Points.find({ services: this._id}).map(p => {
      if (p.needModeration) {
        p.reviewStatus = 'needModeration';
      } else if (p.tosdr.irrelevant) {
        p.reviewStatus = 'tosdr.irrelevant';
      } else {
        p.reviewStatus = 'accepted (i.e. moderated and not irrelevant)';
      }
      return p;
    });
  }
});

Template.curate.events({
  'click li': function (event) {
    var point = this;
    Router.go('/points/edit/' + point._id);
  }
});
