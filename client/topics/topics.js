Template.topics.events({
  'click .deleteButton': function () {
    if (window.confirm('Do you really want to delete this Topic?')) {
      Topics.remove(this._id);
    }
  }
});

Template.topics.helpers({
  settings: function() {
    return {
      collection: 'reactiveTopics',
      fields: [
        'ID',
        {
          key: 'title',
          label: TAPi18n.__('title')
        }, {
          key: 'subtitle',
          label: TAPi18n.__('subtitle')
        }, {
          key: 'description',
          label: TAPi18n.__('description')
        }, {
          key: 'type',
          label: TAPi18n.__('type')
        }, {
          key: 'category',
          label: TAPi18n.__('category')
        }, {
          key: 'submittedBy',
          label: TAPi18n.__('submittedBy')
        }, {
          label: TAPi18n.__('action'),
          tmpl: Template.moderateTopic,
          hidden: function() {return !utils.isModerator()}
        }
      ]
    }
  }
});

