import axios from 'axios';

export const getGallery = async (query, page) => {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '38325444-19d5d000bdb868a15072d8439';
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page,
    });
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
  }


