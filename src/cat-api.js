import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_v98ahnlFiVMydzVn8ncJ7LHFpinfTPe1eHA7HEWRb0N3dscHBZuDPqCqo275qqCd';

export function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching breeds:', error);
        throw new Error('Failed to fetch breeds');
      });
  }
  

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => {
        return response.data[0];
      })
      .catch(error => {
        console.error('Error fetching cat details:', error);
        throw new Error('Failed to fetch cat details');
      });
  }