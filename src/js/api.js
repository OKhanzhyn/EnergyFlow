import axios from 'axios';

function getApiInfo({ filter, page = 1, limit = 12, type }) {
  return axios.get(`https://energyflow.b.goit.study/api/${type}`, {
    params: {
      filter,
      page,
      limit,
    },
  });
}

function postApiInfo(userEmail, type) {
  return axios.post(`https://energyflow.b.goit.study/api/${type}`, userEmail);
}
