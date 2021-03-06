Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function () {
    return [
      Meteor.subscribe('services'),
      Meteor.subscribe('points'),
      Meteor.subscribe('topics')
    ];
  }
});

Router.route('/', {name: 'index'});

Router.route('/publish', {
    name: 'publish'
  }
);

Router.route('/curate/:_id', {
    name: 'curate',
    data: function () {
      return Services.findOne(this.params._id);
    }
  }
);

function requireLogin(self) {
  var user = Meteor.user();
  if (user) {
    if (utils.isVerified()) {
      this.next();
    } else {
      this.render('emailNotVerified');
    }
  } else {
    handleNoUserButUserRequiredProblem(this);
  }
}

function handleNoUserButUserRequiredProblem(self) {
  if (Meteor.loggingIn()) {
    self.render(this.loadingTemplate);
  }
  else {
    self.render('accessDenied');
  }
}

function requiresModerator() {
  if (Meteor.user()) {
    if (utils.isModerator()) {
      this.next();
    } else {
      this.render('accessDeniedNeedsModerator');
    }
  } else {
    handleNoUserButUserRequiredProblem(this);
  }
}

Router.onBeforeAction(requireLogin, {except: 'index'});
Router.onBeforeAction(requiresModerator, {only: ['createTopic', 'createService', 'publish', 'curate']});
