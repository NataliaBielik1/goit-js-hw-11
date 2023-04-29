import "./css/styles.css";
import Pixabay from "./js/pixabay";
//const axios = require('axios/dist/browser/axios.cjs'); // browser
const API_KEY = "35895618-9d514dded583d246a91a253e5";
const pixabay = new Pixabay(API_KEY);
const form = document.querySelector("form");
const getSearchString = () => form.querySelector("input").value;
const gallery = document.querySelector(".gallery");

const onSumbit = async e => {
  e.preventDefault();
  console.log(pixabay);
  const images = await pixabay.search(getSearchString());
  gallery.innerHTML = "";

  gallery.innerHTML = images.map(i => renderImageCard(i)).join("");
};

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

form.onsubmit = onSumbit;
