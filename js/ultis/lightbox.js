import { getImagePostModal, getPostModal } from "./selector";

export function doExitForImage() {
  let postModal = getPostModal();
  let postModalBody = getPostModal().querySelector(".post__modal-body");
  postModalBody.classList.remove("post__modal-body-active");
  postModalBody.classList.remove("post__modal-body-active-2");
  postModalBody.classList.add("post__modal-body-active-3");
  postModal.classList.remove("post__modal-active");
}
export function handleModal({ sourceImage, posImage, sumCountImage }) {
  let postModal = getPostModal();
  if (!postModal) return;

  let postModalBody = getPostModal().querySelector(".post__modal-body");
  if (!postModalBody) return;
  postModalBody.classList.remove("post__modal-body-active-3");
  postModalBody.classList.remove("post__modal-body-active-4");
  postModalBody.classList.remove("post__modal-body-active-5");
  postModalBody.classList.remove("post__modal-body-active-6");

  let postModalBodyImg = postModalBody.querySelector(".post__modal-body-img");
  if (!postModalBodyImg) return;
  postModalBodyImg.dataset.id = posImage;

  let postModalArrow = getPostModal().querySelector(".post__modal-arrow");
  if (!postModalArrow) return;
  switch (posImage) {
    case 1:
      postModalArrow.classList.remove("post__modal-prev");
      postModalArrow.classList.add("post__modal-next");
      break;
    case sumCountImage:
      postModalArrow.classList.remove("post__modal-next");
      postModalArrow.classList.add("post__modal-prev");
      break;
  }

  let imgFromPost = getImagePostModal();
  if (!imgFromPost) return;
  if (posImage == 2) {
    postModalBody.classList.add("post__modal-body-active-4");
  }

  let countPrev = getPostModal().querySelector(".post__modal-info-count-prev");
  if (!countPrev) return;

  let countNext = getPostModal().querySelector(".post__modal-info-count-next");
  if (!countNext) return;

  imgFromPost.src = sourceImage;
  countPrev.textContent = posImage;
  countNext.textContent = sumCountImage;
  postModal.classList.add("post__modal-active");
  if (imgFromPost.dataset.check != posImage) {
    postModalBody.classList.add("post__modal-body-active");
  } else {
    postModalBody.classList.remove("post__modal-body-active");
    postModalBody.classList.add("post__modal-body-active-2");
  }
  imgFromPost.dataset.check = posImage;
}
