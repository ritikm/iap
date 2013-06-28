var RouterFunctions = {
  companyStudentProfile: function(studentId) {
    Session.set("currentStudent", studentId);
    return 'companyStudentProfile';
  }
};

Meteor.Router.add({
  '/': 'index',
  '/test': 'test',
  '/admin-tony/student/add': 'addStudent',
  '/admin-tony/company/add': 'addCompany',
  '/admin-tony/company/representative/add': 'addCompanyRepresentative',
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
    // FIXME: permissions
    return page;
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
