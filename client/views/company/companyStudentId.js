Template.companyStudentId.events = {
  'submit .form-signin': function(e) {
    e.preventDefault();
    var idNumber = $("#id-number").val();
    Meteor.call("getStudentProfile", idNumber, function(error, student) {
      if (student) {
        Meteor.Router.to("/company/student/" + idNumber);
      } else {
        console.log("ERROR!");
      }
    });
  }
}