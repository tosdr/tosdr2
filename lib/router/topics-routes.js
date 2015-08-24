Router.route('/topics', {
    name: 'topics',
  }
);

Router.route('/topics/create', {
    name: 'createTopic',
    data: function () {
      return {
        "id": "",
        "title": "",
        "subtitle": "",
        "description": "",
        "type": "topic"
      };
    }
  }
);

Router.route('/topics/edit/:_id', {
    name: 'editTopic',
    data: function () {
      return Topics.findOne(this.params._id);    }
  }
);

