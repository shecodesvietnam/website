function pipe(obj, pipedFunc) {
  const type = typeof obj;
  var clonedObj;

  if (type === "string") {
    clonedObj = obj.slice();
  } else if (type === "number" || type === "boolean") {
    clonedObj = obj;
  } else {
    clonedObj = Object.create(obj);
  }

  return pipedFunc.reduce(function compose(cur, acc) {
    return acc(cur) || cur;
  }, clonedObj);
}

export { pipe };
