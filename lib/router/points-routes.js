Router.route('/points/submit', {
  name: 'submitPoint',
  data: function () {
    return {tosdr: {sources:[]}};
  }
});

Router.route('/points', {
    name: 'points',
    data: function () {
      return Points.find();
    }
  }
);

Router.route('/points/moderate', {
    name: 'moderatePoints',
    waitOn: function () { return Meteor.subscribe('points'); },
    data: function () {
      return Points.find(pointRoutesUtils.getFilter());
    }
  }
);

Router.route('/points/edit/:_id', {
    name: 'editPoint',
    data: function () {
      return Points.findOne(this.params._id);
    }
  }
);
