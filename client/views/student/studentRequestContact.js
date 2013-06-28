Template.studentRequestContact.events = {
  'submit .form-signin': function(e) {;
    e.preventDefault();
    var idNumber = $("#id-number").val();
    User.push(Meteor.userId(), "profile.student.contactsRequested", idNumber);
  }
}