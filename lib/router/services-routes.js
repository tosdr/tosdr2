Router.route('/services', {
    name: 'services',
    data: function () {
      return Services.find();
    }
  }
);

Router.route('/services/create', {
    name: 'createService',
    data: function () {
      return {
        type: 'service'
      };
    }
  }
);

Router.route('/services/edit/:_id', {
    name: 'editService',
    data: function () {
      return Services.findOne(this.params._id);    }
  }
);

