Template.addStudent.events = {
  'submit #student-registration': function(e) {
    e.preventDefault();

    var form = {};
    var studentData = $("#student-registration").serializeArray();
    
    $.each(studentData, function() {
      form[this.name] = this.value;
    });

    form["student"] = true;

    console.log("form:", form);

    Meteor.call("addStudent", form, function(error, result) {
      if (result) {
        alert("OK! Your ID number is: " + form.id);
      }
    });
  }
}