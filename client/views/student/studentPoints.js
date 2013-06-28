Template.studentPoints.helpers({
  totalPoints: function() {
    var totalPoints = 0;
    var companyPoints = Meteor.user().profile.student.companyPoints;
    _.each(companyPoints, function(companyPoint) {
      totalPoints += companyPoint.points;
    });
    return totalPoints;
  },

  companyPoints: function() {
    return Meteor.user().profile.student.companyPoints;
  }
});