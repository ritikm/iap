Meteor.publish("studentLeaderboard", function() {
  return User.find({
    "profile.student": { $exists: true }
  }, {
    fields: {
      "profile.student.name": 1,
      "profile.student.companyPoints": 1
    }
  });
});

Meteor.publish(null, function() {
  return User.find({
    "profile.company": { $exists: true }
  }, {
    fields: {
      "profile.company.name": 1
    }
  });
});

Meteor.publish("companyStudent", function(studentId) {
  console.log("companyStudent:", User.findOne(studentId));

  return User.find({ "_id": studentId });
});

//Meteor.publish("companyStudents", function() {
//  return User.find({ "profile.student": { $exists: true } });
//});
//
//Meteor.publish("studentProfile", function(studentId) {
//  console.log("studentId", studentId);
//  var x = User.findOne(studentId);
//  console.log("x:", x);
//  return x;
//});