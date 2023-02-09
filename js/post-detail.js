import postApi from "./api/postApi";
import dayjs from "dayjs";
import {
  doExitForImage,
  getAllImage,
  getImagePostModal,
  getPostModal,
  getPostModalX,
  handleModal,
  handleSwitchLinkButton,
  setLiElement,
} from "./ultis";

export function renderPostId(postId) {
  setLiElement(document, "#postDetailTitle", postId.title);
  setLiElement(document, "#postDetailAuthor", postId.author);
  setLiElement(document, "#postDetailDescription", postId.description);
  setLiElement(
    document,
    "#postDetailTimeSpan",
    dayjs(postId.updatedAt).format("- DD/MM/YYYY HH:mm")
  );
  var postHeroImage = document.getElementById("postHeroImage");
  postHeroImage.style.backgroundImage = `url("${postId.imageUrl}")`;
  // background-image: url("")
  postHeroImage.addEventListener("error", () => {
    postHeroImage.style.backgroundImage =
      "https://via.placeholder.com/1368x400.png?";
  });
  var editPageLink = document.getElementById("goToEditPageLink");
  editPageLink.innerHTML = `<i class="fas fa-edit"></i> Edit Post`;
}
function handleEventForImage(imageListItem) {
  if (imageListItem[0].dataset.call) return;
  imageListItem[0].dataset.call = 1;

  document.addEventListener("click", (event) => {
    const { target } = event; // Object destructuring;
    if (target.tagName != "IMG" || !target.dataset.image) return;
    let positionImage = [...imageListItem].findIndex((e) => e == target);
    handleModal({
      sourceImage: target.src,
      posImage: positionImage + 1,
      sumCountImage: imageListItem.length,
    });
  });
}
function handleExitForImage() {
  let postModalX = getPostModalX();
  if (!postModalX) return;
  postModalX.addEventListener("click", (e) => {
    e.preventDefault();
    doExitForImage();
  });

  let postModalBodyWrap = getPostModal().querySelector(".post__modal-wrap");
  if (!postModalBodyWrap) return;
  postModalBodyWrap.addEventListener("click", doExitForImage);

  document.addEventListener("keydown", (e) => {
    if (e.which == 27) {
      doExitForImage();
    }
  });
}
function handleMoveButton() {
  let arrowButton = getPostModal().querySelector(".post__modal-arrow");
  if (!arrowButton) return;
  arrowButton.addEventListener("click", (e) => {
    e.preventDefault();
    const { target } = e;
    let postModalBodyImg = arrowButton.parentElement;
    let idModalBodyImg = postModalBodyImg.dataset.id;
    let postModalBody = getPostModal().querySelector(".post__modal-body");
    let imgFromPost = postModalBody.querySelector("img");
    let imageListItem = getAllImage();
    let countPrev = postModalBody.querySelector(".post__modal-info-count-prev");
    if (arrowButton.matches(".post__modal-next")) {
      arrowButton.classList.remove("post__modal-next");
      arrowButton.classList.add("post__modal-prev");
      postModalBody.classList.remove("post__modal-body-active-6");
      postModalBody.classList.add("post__modal-body-active-5");
      imgFromPost.src = imageListItem[idModalBodyImg].src;
      countPrev.textContent = +idModalBodyImg + 1;
    } else {
      arrowButton.classList.remove("post__modal-prev");
      arrowButton.classList.add("post__modal-next");
      postModalBody.classList.remove("post__modal-body-active-5");
      postModalBody.classList.add("post__modal-body-active-6");
      imgFromPost.src = imageListItem[idModalBodyImg - 2].src;
      countPrev.textContent = +idModalBodyImg - 1;
    }
    postModalBodyImg.dataset.id = countPrev.textContent;
  });
}
(async () => {
  try {
    var getURL = new URLSearchParams(window.location.search);
    var getId = getURL.get("id");
    if (!getId) {
      window.location.assign("./index.html");
      return;
    }
    // Get API
    var postId = await postApi.getById(getId);
    renderPostId(postId);
    // Get All Image
    var imageListItem = getAllImage();
    handleEventForImage(imageListItem);
    handleExitForImage();
    handleMoveButton();
    handleSwitchLinkButton("goToEditPageLink", postId.id, "add-edit-post");
  } catch (error) {
    console.log(error);
  }
})();
