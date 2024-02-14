import axios from 'axios';

function getApiInfo({ filter, page = 1, limit = 12, type, ...params }) {
  return axios.get(`https://energyflow.b.goit.study/api/${type}`, {
    params: {
      ...params,
      filter,
      page,
      limit,
    },
  });
}

function postApiInfo(userEmail, type) {
  return axios.post(`https://energyflow.b.goit.study/api/${type}`, userEmail);
}

export { getApiInfo, postApiInfo };
