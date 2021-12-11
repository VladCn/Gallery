// import './css/styles.css';
import axios from 'axios';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';

const formJS = document.querySelector(".search-form")
const galleryJS = document.querySelector(".gallery")

formJS.addEventListener("submit", action)

async function getPhotos(inquiry){
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=24765939-636e8942567168a69f12817e3&q=${inquiry}&image_type=photo`);
    console.log(response);
    return response.data
  } catch (error) {
    console.log(error.message);
  }

}
async function action(event) {
  event.preventDefault();
  const {
    elements: { searchQuery }
  } = event.currentTarget;
  console.log(searchQuery.value)
  const inquiry = searchQuery.value
  console.log(inquiry)

  const resultServer = await getPhotos(inquiry)
  console.log(resultServer)

  const result = resultServer.hits.map(photos  => photos.webformatURL)
  console.log(result)

 const innerHTML = result.map(res => {
     return `
      <div class="photo-card">
        <img src=${res} alt="" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
          </p>
          <p class="info-item">
            <b>Views</b>
          </p>
          <p class="info-item">
            <b>Comments</b>
          </p>
          <p class="info-item">
            <b>Downloads</b>
          </p>
        </div>
      </div>
    `
  }).join(",")
    console.log(innerHTML)
  galleryJS.innerHTML = innerHTML



  // galleryJS.innerHTML = " <div class=\"photo-card\">\n" +
  //     "  <img src=`${result[key]}` alt=\"\" loading=\"lazy\" />\n" +
  //     "  <div class=\"info\">\n" +
  //     "    <p class=\"info-item\">\n" +
  //     "      <b>Likes</b>\n" +
  //     "    </p>\n" +
  //     "    <p class=\"info-item\">\n" +
  //     "      <b>Views</b>\n" +
  //     "    </p>\n" +
  //     "    <p class=\"info-item\">\n" +
  //     "      <b>Comments</b>\n" +
  //     "    </p>\n" +
  //     "    <p class=\"info-item\">\n" +
  //     "      <b>Downloads</b>\n" +
  //     "    </p>\n" +
  //     "  </div>\n" +
  //     "</div> "

}


