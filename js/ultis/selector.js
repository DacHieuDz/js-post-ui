export function getId(element) {
  return document.getElementById(element);
}
export function getAllImage() {
  return document.querySelectorAll("[data-image = first-click");
}
export function getPostModal() {
  return document.querySelector(".post__modal");
}
export function getPostModalX() {
  return getPostModal().querySelector(".post__modal-x a");
}
export function getImagePostModal() {
  return getPostModal().querySelector("img");
}
