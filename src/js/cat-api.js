import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
 'live_Dwdf41nG9kwyuZnidifIeraB7REGqq55wGizESsVIWnKCd1Wl06ao1X1xeJ0V6jU';
 axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

//  axios.defaults.
  function fetchBreeds() {
    return axios.get('/breeds').then(resp => {
      return resp.data;
    });
  }

function fetchCatByBreed(breedId ) {
    return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
        return resp.data;
      });
}

module.exports = { fetchBreeds, fetchCatByBreed };

