// import './css/styles.css';
import axios from 'axios';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';


const formJS = document.querySelector(".search-form")
const galleryJS = document.querySelector(".gallery")

formJS.addEventListener("submit", action)

async function getPhotos(inquiry){
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=24765939-636e8942567168a69f12817e3&q=${inquiry}&image_type=photo&orientation=horizontal&safesearch=true`);
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

  // const result = resultServer.hits.map(photos  => photos)
  // console.log(result)

  galleryJS.innerHTML = resultServer.hits.map(({webformatURL, likes, views, comments, downloads}) => {
     return `
      <div class="photo-card">
        <img src=${webformatURL} alt="" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes <span>${likes}</span></b>
          </p>
          <p class="info-item">
            <b>Views <span>${views}</span></b>
          </p>
          <p class="info-item">
            <b>Comments <span>${comments}</span></b>
          </p>
          <p class="info-item">
            <b>Downloads <span>${downloads}</span></b>
          </p>
        </div>
      </div>
    `
  }).join(" ")




}


