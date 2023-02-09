export function cloneElement(needTag, element) {
  var fakeElement = document.createElement(needTag);
  fakeElement = element.cloneNode(true);
  return fakeElement;
}
