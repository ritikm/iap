Template.studentPoints.helpers({
  totalPoints: function() {
    var totalPoints = 0;
    var companyPoints = Meteor.user().profile.student.companyPoints;
    _.each(_.values(companyPoints), function(points) {
      totalPoints += points;
    });
    return totalPoints;
  },

  companyPoints: function() {
    return [Meteor.user().profile.student.companyPoints];
  },

  company: function() {
    console.log(_.keys(this));
    return _.keys(this)[0];
  },

  points: function() {
    console.log(this);
    return _.values(this)[0];
  }
});