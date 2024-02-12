import { getApiInfo } from './api.js';
import { postApiInfo } from './api.js';

// Дані гіпотетичні які збережені на модальному вікні із справами

// button class="add-to-favorites" > Add to favorites</button >
// <button class="remove-from-favorites">Remove</button
// let exercise = {
//   _id: exerciseId,
//   name: exerciseName,
//   burnedCalories: exerciseBurnedCalories,
//   bodyPart: exerciseBodyPart,
//   target: exerciseTarget,
// };

const addToFavoritesBtn = document.querySelector('.add-to-favorites');
const removeFromFavoritesBtn = document.querySelector('.remove-from-favorites');
const galleryContainer = document.querySelector('.list-favorites');

// Отримуємо вправу з локального сховища якщо вона там є, якщо так то приховуємо кнопку "Add to favorites", якщо ні ховаємо "Remove"
const exercise = JSON.parse(localStorage.getItem('favoriteExercise'));
if (exercise) {
  addToFavoritesBtn.style.display = 'none';
} else {
  removeFromFavoritesBtn.style.display = 'none';
}

addToFavoritesBtn.addEventListener('click', () => {
  // Зберігаємо вправу в локальне сховище
  localStorage.setItem('favoriteExercise', JSON.stringify(exercise));
  // Додаємо вправу до галереї
  galleryContainer.innerHTML += `
    <li class="item-favorites" data-id="${exercise._id}">
            <div class="workout-block">
              <p class="workout-title">Workout</p>
              <button class="delete-from-fav" type="button">
                <svg class="delete-icon" width="16" height="16">
                  <use href="../img/sprite.svg#icon-delete"></use>
                </svg>
              </button>
            </div>
            <button class="start-btn" type="button">
              Start
              <svg class="arrow-icon" width="14" height="14">
                <use href="../img/sprite.svg#icon-arrow"></use>
              </svg>
            </button>
            <div class="ex-title-block">
              <div class="icon-man-wraper">
                <svg class="man-icon" width="16" height="16">
                  <use href="../img/sprite.svg#icon-running-man"></use>
                </svg>
              </div>
              <h3 class="ex-title">${exercise.name}</h3>
            </div>
            <ul class="list-ex-category">
              <li>
                <p class="category-text">
                  <span class="category-text-accent">Burned calories: ${exercise.burnedCalories} </span
                  >200/ 3 min
                </p>
              </li>
              <li>
                <p class="category-text">
                  <span class="category-text-accent">Body part: ${exercise.bodyPart}: </span>Waist
                </p>
              </li>
              <li>
                <p class="category-text">
                  <span class="category-text-accent">Target: ${exercise.target}: </span>Abs
                </p>
              </li>
            </ul>
          </li>
    `;

  addToFavoritesBtn.style.display = 'none';
  removeFromFavoritesBtn.style.display = 'block';
});

removeFromFavoritesBtn.addEventListener('click', () => {
  // id вправи, яку треба видалити
  const exerciseId = exercise._id;

  // Отримуємо всі вправи з локального сховища
  const exercises = JSON.parse(localStorage.getItem('favoriteExercise')) || [];

  // Видаляєм вправу з масиву вправ
  const updatedExercises = exercises.filter(item => item._id !== exerciseId);
  localStorage.setItem('favoriteExercise', JSON.stringify(updatedExercises));

  // Видаляєм вправу з галереї
  const exerciseCard = document.querySelector(
    `.item-favorites[data-id="${exerciseId}"]`
  );
  if (exerciseCard) {
    exerciseCard.remove();
  }

  removeFromFavoritesBtn.style.display = 'none';
  addToFavoritesBtn.style.display = 'block';
});
