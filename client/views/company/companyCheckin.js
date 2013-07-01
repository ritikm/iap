Template.companyCheckin.helpers({
  companies: function() {
    return User.findAll({ "profile.company": { $exists: true } });
  },

  name: function() {
    return this.profile.company.name;
  }
});

Template.companyCheckin.events = {
  'submit .form-signin': function(e) {
    e.preventDefault();
    var companyName = $("#company-name").val();
    var email = $("#email").val();
    var username = $("#username").val();

    Meteor.loginWithPassword(username, "pass-tony", function(error) {
      if (!error) {
        Meteor.subscribe("companyStudents");
      }
    });

//    Meteor.call("verifyCompanyRepresentative", companyName, username, email, function(error, isValid) {
//      if (isValid) {
//        Meteor.loginWithPassword(idNumber, "pass-tony", function(error) {
//          if (!error) {
//            Meteor.subscribe("companyStudents");
//          }
//        });
//      }
//    });
  }
};