import "./css/styles.css";
import { Notify } from "notiflix";
const axios = require("axios").default;
const API_KEY = "35895618-9d514dded583d246a91a253e5";
const form = document.querySelector("form");
const getSearchString = () => form.querySelector("input").value;
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

let page = 1;
const per_page = 40;
let loadedImagesNum = 0;
let limit = 0;

const showLoadMoreOnDemand = () => loadedImagesNum > 0 && showLoadMore();
const hideLoadMore = () => (loadMoreBtn.style.display = "none");
const showLoadMore = () => (loadMoreBtn.style.display = "inline");

const onSubmit = async e => {
  e.preventDefault();
  hideLoadMore();
  clearGallery();
  page = 1;
  loadedImagesNum = 0;
  addToGallery((await findImages()));
  showLoadMoreOnDemand();
};

const findImages = async () => search(getSearchString());
const clearGallery = () => (gallery.innerHTML = "");
const addToGallery = images =>
  gallery.insertAdjacentHTML("beforeend", renderImages(images));
const loadMore = async () => {
  addToGallery((await findImages()));
  showLoadMore();
};

const onLoadMore = () => {
  page++;
  loadMore();
};

const renderImages = images => images.map(i => renderImage(i)).join("");

const renderImage = i => {
  return `
    <div class="photo-card">
      <img src="${i.webformatURL}" alt="${i.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes<br>${i.likes}</b>
        </p>
        <p class="info-item">
          <b>Views<br>${i.views}</b>
        </p>
        <p class="info-item">
          <b>Comments<br>${i.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads<br>${i.downloads}</b>
        </p>
      </div>
    </div>
  `;
};

const search = async q => {
  if (limit > 0 && loadedImagesNum + per_page > limit) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    hideLoadMore();
    return [];
  }

  let url = `https://pixabay.com/api/?key=${API_KEY}&q=${q}&page=${page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`;
  let res = await axios.get(url);

  if (res.status !== 200) {
    return [];
  }

  limit = res.data.totalHits;

  if (res.data.hits.length === 0) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    return [];
  }

  loadedImagesNum += res.data.hits.length;

  return res.data.hits;
};

hideLoadMore();
form.onsubmit = onSubmit;
loadMoreBtn.onclick = onLoadMore;
