import { UnsplashAPI } from './UnsplashAPI';
import { createGalleryCard } from './createMarkup';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const galleryContainer = document.querySelector('.js-gallery');
const paginationContainer = document.querySelector('#tui-pagination-container');
const form = document.querySelector('.js-search-form');
const loader = document.querySelector('.loader');

form.addEventListener("submit", handleSubmit);

const options = {
  totalItems: 0,
  itemsPerPage: 12,
  visiblePages: 5,
  page: 1,
};

const api = new UnsplashAPI();
const pagination = new Pagination(paginationContainer, options);
const page = pagination.getCurrentPage();
pagination.on('afterMove', popular);

api.getPopularPhotos(page).then(response => {
  const markup = createGalleryCard(response.results);
  galleryContainer.innerHTML = markup;
  pagination.reset(response.total);
});

function handleSubmit(event) {
  event.preventDefault();

  const query = event.target.elements.query.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Whrite correct search!',
      position: 'topRight'
    })
    return;
  }
  
  api.query = query;
  pagination.off('afterMove', popular);
  pagination.off('afterMove', getByQuery);
  loader.classList.remove('is-hiden');
  api.getPhotosByQuery(page)
    .then(({ results, total }) => {
      if (!results.length) {
        iziToast.error({
          message: 'Error. Incorrect input!'
        })
        return;
      }
      if (total <= 12) {
        paginationContainer.classList.add('is-hiden')
      }
      else {
        paginationContainer.classList.remove('is-hiden')
      }
      const markup = createGalleryCard(results);
      galleryContainer.innerHTML = markup;
      pagination.reset(total);
    })
    .catch(err => iziToast.error({
      message: 'Error. Something went wrong!'
    }))
    .finally(() => {
      form.reset()
      loader.classList.add('is-hiden');
    })

   pagination.on('afterMove', getByQuery);
   
 }

function popular(event) {
  const currentPage = event.page;
  api.getPopularPhotos(currentPage).then(({ results }) => {
    const markup = createGalleryCard(results);
    galleryContainer.innerHTML = markup;
  });
}

function getByQuery(event) {
  const currentPage = event.page;

  api.getPhotosByQuery(currentPage).then(({ results }) => {
    const markup = createGalleryCard(results);
    galleryContainer.innerHTML = markup;
  });
}
