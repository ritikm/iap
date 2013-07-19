Template.studentRequestContact.helpers({
  contactRequestedSuccess: function() {
    console.log(Session.get("contactRequested"));
    return Session.get("contactRequested") == "x";
  },

  contactRequestedError: function() {
    return Session.get("contactRequested") == "error";
  }
});

Template.studentRequestContact.created = function() {
  console.log("created");
  Session.set("contactRequested", undefined);
};

Template.studentRequestContact.events = {
  'submit .form-signin': function(e) {;
    e.preventDefault();
    var idNumber = $("#id-number").val();
    Meteor.call("checkStudentId", idNumber, function(error, exists) {
      console.log("e", error, "ee", exists);
      if (exists) {
        console.log("e", Meteor.userId());
        User.push(Meteor.userId(), "profile.student.contactsRequested", idNumber);
        Session.set("contactRequested", "x");
        console.log(Session.get("contactRequested"));
      } else {
        Session.set("contactRequested", "error");
      }
    });
  }
};