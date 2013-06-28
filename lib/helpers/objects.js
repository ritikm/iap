flattenObject = function (object, prefix) {
  if (_.isUndefined(prefix)) {
    prefix = "";
  }

  if (prefix != "") {
    prefix += ".";
  }

  var result = {};

  for (var key in object) {
    var value = object[key];
    if (!_.isObject(value)) {
      result[prefix + key] = value;
    } else {
      var flattenedObject = flattenObject(value, prefix + key);
      _.extend(result, flattenedObject);
    }
  }

  return result;
}