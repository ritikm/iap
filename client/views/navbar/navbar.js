Template.navbar.helpers({
  isStudent: function() {
    return Meteor.user() && Meteor.user().profile.student;
  },

  isCompany: function() {
    return Meteor.user() && Meteor.user().profile.company;
  }
});

Template.navbar.rendered = function() {
  var currentPage = Meteor.Router.page();
  $(".active").removeClass("active");
  $("#" + currentPage + "-tab").addClass("active");
};