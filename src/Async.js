// import axios from 'axios';
// import Notiflix from 'notiflix';
//
//
// async function getPhotos(inquiry, page = 1){
//
//   try {
//     const response = await axios.get(`https://pixabay.com/api/?key=24765939-636e8942567168a69f12817e3&q=${inquiry}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
//     console.log(response);
//     return response.data
//   } catch (error) {
//     console.log(error.message);
//   }
// }
//
// buttonAdd.addEventListener("click", addPage)
// async function addPage(event){
//   event.preventDefault();
//
//   page += 1;
//   await action(event, page)
// }
//
//
// async function action(event, currentPage = 1) {
//   event.preventDefault();
//   let isNewInq = true;
//   const {
//     elements
//   } = event.currentTarget;
//   if(!elements?.searchQuery){
//     isNewInq = false;
//   } else{
//     page = 1
//     inq = elements.searchQuery.value;
//   }
//
//   const resultServer = await getPhotos(inq, currentPage)
//   console.log(inq)
//
//   if(inq){
//     buttonAdd.classList.add("on")
//   }
//   if(!resultServer.total){
//     return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//   }