import { UnsplashAPI } from './UnsplashAPI';
import { createGalleryCard } from './createMarkup';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const galleryContainer = document.querySelector('.js-gallery');
const paginationContainer = document.querySelector('#tui-pagination-container');

const options = {
  totalItems: 0,
  itemsPerPage: 12,
  visiblePages: 5,
  page: 1,
};

const api = new UnsplashAPI();
const pagination = new Pagination(paginationContainer, options);
const page = pagination.getCurrentPage();
pagination.on('afterMove', event => {
  const currentPage = event.page;
  api.getPopularPhotos(currentPage).then(({ results }) => {
    const markup = createGalleryCard(results);
    galleryContainer.innerHTML = markup;
  });
});

api.getPopularPhotos(page).then(response => {
  const markup = createGalleryCard(response.results);
  galleryContainer.innerHTML = markup;
  pagination.reset(response.total);
});
