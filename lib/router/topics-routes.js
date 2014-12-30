Router.route('/topics', {
    name: 'topics',
    data: function () {
      return Topics.find();
    }
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
        "type": "category"
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