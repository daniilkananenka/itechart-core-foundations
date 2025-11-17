function createComponentHandler(callback, thisArg) {
  return callback.bind(thisArg);
}
