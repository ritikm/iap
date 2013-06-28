BaseModel = Class.extend({
  init: function(collectionName) {
    if (typeof(collectionName) == "object") {
      // collectionName is actually an instance of the "users" collection (Meteor.users)
      _.extend(this, collectionName);
    } else {
      // collectionName is a string for a new collection to be instantiated
      _.extend(this, new Meteor.Collection(collectionName, {
        transform: function(doc) {
          doc["_collectionType"] = collectionName.substring(0, collectionName.length - 1);
          return doc;
        }
      }));
    }
  },

  getCollection: function () {
    return this;
  },
  
  count: function (query) {
    return this.find(query).count();
  },
  
  findAll: function (query) {
    return this.find(query).fetch();
  },
  
//  findOne: function (query) {
//    return this.findOne(query)
//  },
//
//  create: function (data, callback) {
//    if (!callback) {
//      return this.insert(data);
//    } else {
//      return this.insert(data, callback);
//    }
//  },
//
//  update: function (query, update, options, callback) {
//    if (typeof options === 'function') {
//      callback = options;
//    }
//
//    if (!callback) {
//      return this.update(query, update, options);
//    } else {
//      return this.update(query, update, options, callback);
//    }
//  },
  
  set: function (query, updatedData, options, callback) {
    options = options || {};
    return this.update(query, { $set: updatedData }, options, callback);
  },
  
  setAll: function (query, updatedData, callback) {
    return this.set(query, updatedData, { multi: true }, callback);
  },

  unset: function (query, field, callback) {
    var unsetQuery = {};
    unsetQuery[field] = 1;
  
    return this.update(query, { $unset: unsetQuery }, callback);
  },
  
  get: function (query, key, callback) {
    var value = this.findOne(query);
  
    // handle dot notation (key = 'key1.key2' => doc[key1][key2])
    if (key.indexOf(".") > 0) {
      var keys = key.split(".");
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        if (value[key]) {
          value = value[key];
        } else {
          return undefined;
        }
      }
      return value;
    } else {
      if (value[key]) {
        return value[key];
      } else {
        return undefined;
      }
    }
  },

  getAll: function (query, key, callback) {
    // FIXME: This runs find() on the client-side which only has a subset of the database
    // To get proper results, need to run this function on the server.

    var outputKeys = {};
    outputKeys[key] = 1;
    return this.find(query, { fields: outputKeys }).fetch();
  },

  increase: function (query, key, increaseValue, options, callback) {
    var increaseQuery = {};
    increaseQuery[key] = increaseValue;

    options = options || {};

    return this.update(query, { $inc: increaseQuery }, options, callback);
  },

  increaseAll: function (query, key, increaseValue, callback) {
    return this.increase(query, key, increaseValue, { multi: true }, callback);
  },

//  destroy: function (query, callback) {
//    if (!callback) {
//      return this.remove(query);
//    } else {
//      return this.remove(query, callback);
//    }
//  },
  
  push: function (query, field, value, options, callback) {
    var pushQuery = {};
    pushQuery[field] = value;

    options = options || {};
  
    if (_.isArray(value)) {
      // use $pushAll
      return this.update(query, { $pushAll: pushQuery }, options, callback);
    } else {
      // use regular $push
      return this.update(query, { $push: pushQuery }, options, callback);
    }
  },

  pushAll: function (query, field, value, callback) {
    return this.push(query, field, value, { multi: true }, callback);
  },
  
  pull: function (query, field, value, options, callback) {
    var pullQuery = {};
    pullQuery[field] = value;

    options = options || {};
  
    if (_.isArray(value)) {
      // use $pullAll
      return this.update(query, { $pullAll: pullQuery }, options, callback);
    } else {
      // use regular $pull
      return this.update(query, { $pull: pullQuery }, options, callback);
    }
  },

  pullAll: function (query, field, value, callback) {
    return this.pull(query, field, value, { multi: true }, callback);
  },
  
});