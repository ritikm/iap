Template.addCompanyRepresentative.events = {
  'submit form': function(e) {
    e.preventDefault();

    var companyName = $("#name").val();
    var companyEmail = $("#email").val();

    Meteor.call("addCompanyRepresentative", companyName, companyEmail);
  }
};