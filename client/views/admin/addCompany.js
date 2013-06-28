Template.addCompany.events = {
  'submit form': function(e) {
    e.preventDefault();

    var companyName = $("#name").val();
    var username = $("#username").val();

    Meteor.call("addCompany", companyName, username, function(error, result) {
      if (result) {
        alert("OK!");
      }
    });
  }
};