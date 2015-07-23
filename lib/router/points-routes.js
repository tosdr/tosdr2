Router.route('/points/submit', {
  name: 'submitPoint',
  data: function () {
    return {tosdr: {sources:[]}};
  }
});

Router.route('/points', {
    name: 'points',
  }
);

Router.route('/points/edit/:_id', {
    name: 'editPoint',
    data: function () {
      return Points.findOne(this.params._id);
    }
  }
);
