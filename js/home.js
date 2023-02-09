import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import postApi from "./api/postApi"; // default import
import {
  handleEvent,
  renderPagination,
  renderPostList,
  initSearch,
} from "./ultis";
dayjs.extend(relativeTime);

async function handleFilterChange(filterName, filterValue) {
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);
  if (url.searchParams.get("title_like")) {
    url.searchParams.set("_page", 1);
  }
  history.pushState({}, "", url);

  const queryParams = url.searchParams;
  const { data, pagination } = await postApi.getAll(queryParams);
  renderPostList("#postList", data);
  renderPagination("#pagination", pagination);
}

(async () => {
  try {
    const url = new URL(window.location);
    if (!url.searchParams.get("_page")) {
      url.searchParams.set("_page", 1);
    }

    if (!url.searchParams.get("_limit")) {
      url.searchParams.set("_limit", 6);
    }

    history.pushState({}, "", url);
    const queryParams = url.searchParams;
    handleEvent({
      elementId: "pagination",
      queryParams,
      onChange: (page) => handleFilterChange("_page", page),
    });
    initSearch({
      elementId: "search",
      queryParams,
      onChange: (value) => handleFilterChange("title_like", value),
    });

    const { data, pagination } = await postApi.getAll(queryParams);
    const obj = await postApi.getAll(queryParams);
    renderPostList("#postList", data);
    renderPagination("#pagination", pagination);
  } catch (error) {
    console.log("request error", error);
  }
})();
