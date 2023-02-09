import postApi from "./api/postApi";
import { renderPostId } from "./post-detail";
import { getId } from "./ultis";

function handleOptionImage({
  idRandomOption,
  idUploadOption,
  idRandomButton,
  idUploadButton,
}) {
  let randomElement = getId(idRandomOption);
  if (!randomElement) return;

  let uploadElement = getId(idUploadOption);
  if (!uploadElement) return;

  let randomImage = getId(idRandomButton);
  if (!randomImage) return;
  randomImage.addEventListener("input", () => {
    randomElement.hidden = false;
    uploadElement.hidden = true;
  });

  let uploadImage = getId(idUploadButton);
  if (!uploadImage) return;
  uploadImage.addEventListener("input", () => {
    randomElement.hidden = true;
    uploadElement.hidden = false;
  });
}
function handleChangeImageButton(
  idChangeImageButton,
  idChangeBackgroundElement
) {
  let changeImageButton = getId(idChangeImageButton);
  if (!changeImageButton) return;
  changeImageButton.addEventListener("click", () => {
    let changeBackgroundElement = getId(idChangeBackgroundElement);
    let randomNumber = Math.floor(Math.random() * 31 + 130);
    while (randomNumber == 138 || randomNumber == 148 || randomNumber == 150) {
      randomNumber = Math.floor(Math.random() * 31 + 130);
    }
    changeBackgroundElement.style.backgroundImage = `url("https://picsum.photos/id/${randomNumber}/1349/300")`;
  });
}
function renderTitleAndAuthorAndDescription(
  parent,
  { title, author, description, imageUrl },
  postId
) {
  let titleElement = parent.querySelector(title);
  if (!titleElement) return;
  titleElement.value = postId.title;

  let authorElement = parent.querySelector(author);
  if (!authorElement) return;
  authorElement.value = postId.author;

  let descriptionElement = parent.querySelector(description);
  if (!descriptionElement) return;
  descriptionElement.value = postId.description;

  let imageElement = parent.querySelector(imageUrl);
  if (!imageElement) return;
  imageElement.style.backgroundImage = `url("${postId.imageUrl}")`;
}
function handleUploadImageButton() {}
(async () => {
  try {
    const url = new URL(window.location);
    if (url.searchParams.get("id")) {
      const postId = await postApi.getById(url.searchParams.get("id"));
      renderTitleAndAuthorAndDescription(
        document,
        {
          title: "#post-title",
          author: "#post-author",
          description: "#post-description",
          imageUrl: "#postHeroImage",
        },
        postId
      );
    }
    handleOptionImage({
      idRandomOption: "randomImage",
      idUploadOption: "uploadImage",
      idRandomButton: "flexRadioDefault1",
      idUploadButton: "flexRadioDefault2",
    });
    handleChangeImageButton("postChangeImage", "postHeroImage");
    handleUploadImageButton();
  } catch (error) {
    console.log(error);
  }
})();
