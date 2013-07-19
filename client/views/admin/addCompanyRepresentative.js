Template.addCompanyRepresentative.helpers({
  companies: function() {
    return User.findAll({ "profile.company": { $exists: true } });
  },

  name: function() {
    return this.profile.company.name;
  }
});

Template.addCompanyRepresentative.events = {
  'submit form': function(e) {
    e.preventDefault();

    var companyName = $("#name").val();
    var companyEmail = $("#email").val();

    console.log("n", companyName, "e", companyEmail);

    Meteor.call("addCompanyRepresentative", companyName, companyEmail, function(error, result) {
      if (result) {
        alert("OK!");
      }
    });
  }
};