var RouterFunctions = {
  companyStudentProfile: function(studentId) {
    Meteor.subscribe("companyStudent", studentId);
    console.log("studentId:", studentId, User.findOne(studentId));
    Session.set("currentStudent", studentId);
    return 'companyStudentProfile';
  }
};

Meteor.Router.add({
  '/': 'index',
  '/test': 'test',
  '/admin/student/add': 'addStudent',
  '/admin/company/add': 'addCompany',
  '/admin/company/representative/add': 'addCompanyRepresentative',
  '/student/checkin': 'studentCheckin',
  '/student/points': 'studentPoints',
  '/student/request-contact': 'studentRequestContact',
  '/student/leaderboard': 'studentLeaderboard',
  '/company/checkin': 'companyCheckin',
  '/company/student': 'companyStudentId',
  '/company/student/:studentId': RouterFunctions.companyStudentProfile
});

Meteor.Router.filters({
  'checkStudent': function(page) {
    if (Meteor.loggingIn()) {
      return 'loading';
    } else if (Meteor.user() && Meteor.user().profile.student) {
      return page;
    } else {
      return 'studentCheckin';
    }
  },

  'checkCompany': function(page) {
    if (Meteor.loggingIn()) {
      return 'loading';
    } else if (Meteor.user() && Meteor.user().profile.company) {
      return page;
    } else {
      return 'companyCheckin';
    }
  },

  'checkAdmin': function(page) {
    if (Meteor.loggingIn()) {
      return "loading";
    } else if (Meteor.user() && Meteor.user()._id == "admin") {
      return page;
    } else {
      return "studentCheckin";
    }
  }
});

Meteor.Router.filter('checkStudent', { only: ['studentPoints', 'studentRequestContact', 'studentLeaderboard'] });
Meteor.Router.filter('checkCompany', { only: ['companyCheckin', 'companyStudentId', 'companyStudentProfile'] });
Meteor.Router.filter('checkAdmin', { only: ['addStudent', 'addCompany', 'addCompanyRepresentative'] });

Meteor.startup(function() {
  Meteor.autorun(function() {
    // grab the current page from the router, so this re-runs every time it changes
    var page = Meteor.Router.page();
    console.log("page:", page);

    switch(page) {
      case "studentLeaderboard":
        console.log("HELLO");
        Meteor.subscribe("studentLeaderboard");
        break;
    }
  });
});
