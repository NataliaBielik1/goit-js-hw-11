import "./css/styles.css";
import Pixabay from "./js/pixabay";
//const axios = require('axios/dist/browser/axios.cjs'); // browser
const API_KEY = "35895618-9d514dded583d246a91a253e5";
const pixabay = new Pixabay(API_KEY);
const form = document.querySelector("form");
const getSearchString = () => form.querySelector("input").value;
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more");

let page = 1;

const hideLoadMore = () => loadMore.style.display = 'none';
const showLoadMore = () => loadMore.style.display = 'inline';

const onSubmit = async e => {
  e.preventDefault();
  page = 1;
  findAndRender();
};

const findImages = async () => pixabay.search(getSearchString(), page);
const clearGallery = () => gallery.innerHTML = "";
const renderGallery = images => gallery.innerHTML = images.map(i => renderImageCard(i)).join("");
const findAndRender = async () => {
  const images = await findImages();
  clearGallery();
  renderGallery(images);
  showLoadMore();
};

const onLoadMore = () => {
  page++;
  findAndRender();
}

const renderImageCard = i => {
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
loadMore.onclick = onLoadMore;
