import { getApiInfo } from './api.js'

import axios from 'axios';

const apiUrl = 'https://axios-http.com/';
let currentPage = 1;
const itemsPerPage = 10;

document.addEventListener('DOMContentLoaded', () => {
  const paginationButtons = document.querySelectorAll('.page');
  paginationButtons.forEach(button => button.addEventListener('click', () => (currentPage = parseInt(button.textContent)) && updateExercises()));
  updateExercises();
});

const getApiInfo = async (page, limit) => (await axios.get(apiUrl, { params: { page, limit } })).data;

const updateExercises = async () => {
  try {
    const exercises = await getApiInfo(currentPage, itemsPerPage);
    displayExercises(exercises);
  } catch (error) {
    console.error('Ошибка при загрузке упражнений', error);
  }
};

const displayExercises = exercises => {
  // Обновите ваш интерфейс с новыми данными упражнений
  // Это может включать в себя обновление изображений, текстов и ссылок
};