import { getId } from "./selector";

export function handleSwitchLinkButton(element, id, page) {
  let switchLinkButton = getId(element);
  switchLinkButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (id) {
      window.location.assign(`./${page}.html?id=${id}`);
    } else {
      window.location.assign(`./${page}.html`);
    }
  });
}
