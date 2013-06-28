Template.companyStudentProfile.helpers({
  student: function() {
    var studentId = Session.get("currentStudent");
    var data = User.findOne(studentId).profile.student;
    data.graduation = "" + data.grad.month + "/" + data.grad.year;
    return [data];
  }
});

Template.companyStudentProfile.events = {
  'submit form#points': function(e) {
    e.preventDefault();
    var formData = $("#points").serializeArray();
    var form = {};
    var totalPoints = 0;

    $.each(formData, function() {
      form[this.name] = this.value;
      totalPoints += parseInt(this.value);
    });

    var studentId = Session.get("currentStudent");
    var setPointsQuery = {};
    var companyName = Meteor.user().profile.company.name;

    setPointsQuery["profile.student.companyPoints." + companyName] = totalPoints;
    User.set(studentId, setPointsQuery);

    if (form["connect"]) {
      User.push(Meteor.userId(), "profile.company.contactsRequested", studentId);
    }
  }
};