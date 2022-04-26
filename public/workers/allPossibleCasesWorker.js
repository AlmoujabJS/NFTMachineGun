function allPossibleCases(array, result, index) {
  if (!result) {
    result = [];
    index = 0;
    array = array.map(function (element) {
      return element.push ? element : [element];
    });
  }
  if (index < array.length) {
    array[index].forEach(function (element) {
      var a = array.slice(0);
      a.splice(index, 1, [element]);
      allPossibleCases(a, result, index + 1);
    });
  } else {
    result.push(array.flat());
  }

  return result;
}
self.addEventListener("message", (e) => {
  let get = allPossibleCases(e.data);
  self.postMessage(get);
});
