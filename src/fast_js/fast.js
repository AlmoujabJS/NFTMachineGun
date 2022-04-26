function Fast(value) {
  if (!(this instanceof Fast)) {
    return new Fast(value);
  }
  this.value = value || [];
}

function bindInternal3(func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
}

function fastMap(subject, fn, thisContext) {
  var length = subject.length,
    result = new Array(length),
    iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
    i;
  for (i = 0; i < length; i++) {
    result[i] = iterator(subject[i], i, subject);
  }
  return result;
}
function fastForEach(subject, fn, thisContext) {
  var length = subject.length,
    iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
    i;
  for (i = 0; i < length; i++) {
    iterator(subject[i], i, subject);
  }
}
Fast.forEach = fastForEach;
Fast.map = fastMap;
export default Fast;
