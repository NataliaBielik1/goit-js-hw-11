import "./css/styles.css";
import Pixabay from "./js/pixabay";
const axios = require('axios').default;
const API_KEY = "35895618-9d514dded583d246a91a253e5";
const pixabay = new Pixabay(API_KEY, axios);
const form = document.querySelector("form");
const getSearchString = () => form.querySelector("input").value;
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

let page = 1;

const hideLoadMore = () => loadMoreBtn.style.display = 'none';
const showLoadMore = () => loadMoreBtn.style.display = 'inline';

const onSubmit = async e => {
  e.preventDefault();
  page = 1;
  clearGallery();
  loadMore();
};

const findImages = async () => pixabay.search(getSearchString(), page);
const clearGallery = () => gallery.innerHTML = "";
const addToGallery = images => gallery.insertAdjacentHTML('beforeend', renderImages(images));
const loadMore = async () => {
  const images = await findImages();
  addToGallery(images);
  showLoadMore();
};

const onLoadMore = () => {
  page++;
  loadMore();
}

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

hideLoadMore();
form.onsubmit = onSubmit;
loadMoreBtn.onclick = onLoadMore;
