var _ = lodash;

Template.moderatePoints.helpers({
  ifQueryParameterThenSelected: function (key, value) {
    return (pointRoutesUtils.getFilter()[key] === value) ? 'selected' : '';
  },
  query: function () {
    return pointRoutesUtils.getFilter();
  }
});

Template.moderatePoints.events({
  'change #approvedFilter': function (event, template) {
    var oldFilter = pointRoutesUtils.getFilter();
    var newApprovedFilterValue = $(event.target).val();
    var newFilter = _.assign({}, oldFilter, {
      approved: newApprovedFilterValue
    });
    Router.go('moderatePoints', {}, {query: newFilter});
  }
});

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
