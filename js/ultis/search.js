function debounce() {
  var run;

  return function (searchInputValue, onChange) {
    if (run) {
      clearTimeout(run);
    }
    run = setTimeout(() => {
      onChange(searchInputValue);
      run = undefined;
    }, 1000);
  };
}
export function initSearch({ elementId, queryParams, onChange }) {
  var searchElement = document.getElementById(elementId);
  if (!searchElement) return;

  const url = new URLSearchParams(queryParams);
  if (url.get("title_like")) {
    searchElement.value = url.get("title_like");
  }
  var checkDebounce = debounce();

  searchElement.addEventListener("input", (e) => {
    checkDebounce(e.target.value, onChange);
  });
}
