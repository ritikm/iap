Template.studentCheckin.events = {
  'submit .form-signin': function(e) {
    e.preventDefault();
    var idNumber = $("#id-number").val();
    Meteor.loginWithPassword(idNumber, "pass-tony", function(error) {
      if (!error) {
        Meteor.subscribe("studentLeaderboard");
        console.log("user logged in");
        Meteor.Router.to("/student/points");
      }
    });
  }
}