Template.points.helpers({
  settings: function() {
    return {
      collection: 'reactivePoints',
      fields: [
        '_id',
        {
          key: 'title',
          label: TAPi18n.__('title')
        }, {
          key: 'topics',
          label: TAPi18n.__('topics')
        }, {
          key: 'services',
          label: TAPi18n.__('services')
        }, {
          key: 'tosdr',
          fn: function(value) {return value.point},
          label: TAPi18n.__('point')
        }, {
          key: 'tosdr',
          fn: function(value) {return value.summary},
          label: TAPi18n.__('summary')
        }, {
          key: 'tosdr',
          fn: function(value) {return value.sources},
          label: TAPi18n.__('sources')
        }, {
          key: 'approved',
          label: TAPi18n.__('approved')
        }, {
          key: 'submittedBy',
          label: TAPi18n.__('submitted_by')
        }, {
          key: 'approved',
          label: TAPi18n.__('action'),
          tmpl: Template.moderatePoint,
          hidden: function() {return !utils.isModerator()}
        }
      ]
    }
  }
});

