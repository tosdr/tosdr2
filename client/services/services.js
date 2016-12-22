Template.services.events({
  'click .deleteButton': function () {
    if (window.confirm('Do you really want to delete this Service?')) {
      Services.remove(this._id);
    }
  }
});

Template.services.helpers({
  settings: function() {
    return {
      collection: 'reactiveServices',
      fields: [
        {
          key: '_id',
          label: TAPi18n.__('ID')
        },
        {
          key: 'name',
          label: TAPi18n.__('name')
        }, {
          key: 'type',
          label: TAPi18n.__('type')
        }, {
          key: 'urls',
          label: TAPi18n.__('urls')
        }, {
          key: 'submittedBy',
          label: TAPi18n.__('submittedBy')
        }, {
          label: TAPi18n.__('action'),
          tmpl: Template.moderateService,
          hidden: function() {return !utils.isModerator()}
        }
      ]
    }
  }
});

