import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function setLiElement(liNewElement, selector, text) {
  var liAttributeElement = liNewElement.querySelector(selector);
  liAttributeElement.textContent = text;
}
export function createLiElement(postListItem, liElement) {
  var liElement =
    document.querySelector("#postItemTemplate").content.firstElementChild;
  if (!liElement) return;
  var liNewElement = document.createElement("li");
  liNewElement = liElement.cloneNode(true);

  setLiElement(liNewElement, `[data-id="title"]`, postListItem.title);

  if (postListItem.description.length > 99) {
    postListItem.description = `${postListItem.description.slice(0, 100)}…`;
  }
  setLiElement(
    liNewElement,
    `[data-id="description"]`,
    postListItem.description
  );
  setLiElement(liNewElement, `[data-id="author"]`, postListItem.author);

  var imgElement = liNewElement.querySelector(`[data-id="thumbnail"]`);
  if (imgElement) {
    // Handle image error
    imgElement.src = postListItem.imageUrl;

    imgElement.addEventListener("error", () => {
      imgElement.src = "https://via.placeholder.com/1368x400.png?";
    });
  }
  var timeElement = liNewElement.querySelector(`[data-id="timeSpan"]`);
  timeElement.textContent = dayjs(postListItem.updatedAt).fromNow();

  var postItemElement = liNewElement.querySelector("#post-item");
  postItemElement.addEventListener("click", () => {
    window.location.assign(`./post-detail.html?id=${postListItem.id}`);
  });
  return liNewElement;
}
export function renderPostList(postElementId, postList) {
  if (!postList) return;

  var ulPostElement = document.querySelector(postElementId);
  if (!ulPostElement) return;
  ulPostElement.textContent = "";

  postList.forEach((e) => {
    ulPostElement.appendChild(createLiElement(e));
  });
}
