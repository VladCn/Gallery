// import './css/styles.css';
import axios from 'axios';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';



const formJS = document.querySelector(".search-form")
const galleryJS = document.querySelector(".gallery")
const buttonAdd = document.querySelector(".load-more")
let page = 1;
let inq = "";

formJS.addEventListener("submit", action)

async function getPhotos(inquiry, page = 1){

  try {
    const response = await axios.get(`https://pixabay.com/api/?key=24765939-636e8942567168a69f12817e3&q=${inquiry}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
    console.log(response);
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}

buttonAdd.addEventListener("click", addPage)
async function addPage(event){
  event.preventDefault();

  page += 1;
 await action(event, page)
}


async function action(event, currentPage = 1) {
  event.preventDefault();
  let isNewInq = true;
  const {
    elements
  } = event.currentTarget;
  if(!elements?.searchQuery){
    isNewInq = false;
  } else{
    page = 1
    inq = elements.searchQuery.value;
  }

  const resultServer = await getPhotos(inq, currentPage)
  console.log(inq)

  if(inq){
    buttonAdd.classList.add("on")
  }
  if(!resultServer.total){
    return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }


  const photos = resultServer.hits.map(({webformatURL, likes, views, comments, downloads}) => {
    // console.log(resultServer.totalHits)
    console.log(resultServer.totalHits  / (40 * currentPage) )

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
  isNewInq ? (galleryJS.innerHTML = photos) : (galleryJS.insertAdjacentHTML("beforeend", photos))

  if(resultServer.totalHits  / (40 * currentPage) <= 1){
    buttonAdd.classList.remove("on")
    return Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
  }
}

