import axios from 'axios';

export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #API_KEY = 'gcevo00lZKvSMKLnZZJPKYS5xNbpbsP_4i6E-BVlG58';
  #query = '';
  #params = new URLSearchParams({
    per_page: 12,
    orientation: 'portrait',
    client_id: this.#API_KEY
  })

  async getPopularPhotos(page) {
    const url = `${
      this.#BASE_URL
    }?query=popular&page=${page}&${this.#params}`;
    try {
      const { data } = await axios(url);
      return data;
    } catch (error) {
      console.log('Something went wrong');
    }
  }

  async getPhotosByQuery(page) {
    const url = `${
      this.#BASE_URL
    }?query=${this.#query}&page=${page}&${this.#params}`;
    try {
      const { data } = await axios(url);
      return data;
    } catch (error) {
      console.log('Something went wrong');
    }
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
