Template.studentLeaderboard.helpers({
  students: function() {
    var students = User.find({ "profile.student": { $exists: true } }).fetch();

    var studentPoints = _.map(students, function(student) {
      var totalPoints = 0;
      var companyPoints = student.profile.student.companyPoints;
      _.each(companyPoints, function(points, company) {
        totalPoints += points
      });

      return {
        name: student.profile.student.name,
        totalPoints: totalPoints
      };
    });

    console.log("client", studentPoints);

    studentPoints = _.sortBy(studentPoints, function(student) {
      return Math.max(student.totalPoints);
    });

    console.log(studentPoints);
    return studentPoints;
  },
});