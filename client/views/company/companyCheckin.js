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
    var username = $("#username").val();
    var email = $("#email").val();

//    Meteor.loginWithPassword(username, "pass-tony", function(error) {
//      if (!error) {
////        Meteor.subscribe("companyStudents");
//      }
//    });

    Meteor.call("verifyCompanyRepresentative", companyName, username, email, function(error, isValid) {
      console.log("error:", error, "isValid:", isValid);
      if (isValid) {
        Meteor.loginWithPassword(username, "pass-tony", function(error) {
          if (!error) {
//            Meteor.subscribe("companyStudents");
            Meteor.Router.to("/company/student");
          }
        });
      }
    });
  }
};