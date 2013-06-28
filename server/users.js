// TODO: change this

Accounts.onCreateUser(function(options, user) {
  var profile = {};
  options = options.profile;

  if (options.company) {
    // We're adding a new company
    profile = {
      company: {
        name: options.name,
        representatives: [],
        contactsRequested: []
      }
    };

    user._id = options._id;
  } else {
    // We're adding a new student
    profile["student"] = options;

    delete profile.student.student;
    delete profile.student["grad-month"];
    delete profile.student["grad-year"];

    profile.student["grad"] = { month: parseInt(options["grad-month"]), year: parseInt(options["grad-year"]) };
    profile.student.companyPoints = {};
    profile.student.contactsRequested = [];

    user._id = user.username;
  }

  user.profile = profile;

  console.log("profile:", profile);

  return user;
});

var generateId = function() {
  var uniqueStudentId = false;
  var studentId = -1;

  while (!uniqueStudentId) {
    studentId = Random.hexString(5);
    var userExists = User.findOne({ "username": studentId });
    if (!userExists) {
      uniqueStudentId = true;
    }
  }

  return studentId;
};

Meteor.methods({
  getStudentProfile: function(studentId) {
    var x = User.findOne(studentId);
    console.log("student:", x);
    return x;
  },

  getStudentLeaderboard: function() {
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

    return studentPoints;
  },

  addStudent: function(form) {
    var id = generateId();
    Accounts.createUser({ username: id, password: "pass-tony", profile: form });

    return true;
  },

  addCompany: function(name, username) {
    var id = generateId();
    Accounts.createUser({ username: username, password: "pass-tony", profile: { _id: id, company: true, name: name } });

    return true;
  },

  addCompanyRepresentative: function(name, email) {
    User.push({ "profile.company.name": name }, "representatives", email);
  },

  verifyCompanyRepresentative: function(companyName, username, email) {
    var company = User.findOne({
      "username": username,
      "profile.company.name": companyName,
      "profile.company.representatives": email
    });

    return company ? true : false;
  }
});