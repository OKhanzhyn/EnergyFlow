import { getApiInfo } from './api.js';
import { postApiInfo } from './api.js';

import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)
import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;
// new SimpleBar(document.getElementById('simple-id'));

// const bpListContainer = document.querySelector('.bp-list');

// bpListContainer.addEventListener('click', event => {
//   if (event.target.nodeName === 'BUTTON') {
//     const closestListItem = event.target.closest('.bp-item');

//     const cardInfo = {
//       _id: closestListItem.querySelector('.bp-item').textContent,
//     };

//     let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//     const isCardAlreadySelected = favorites.some(
//       item => item._id === cardInfo._id
//     );

//     if (!isCardAlreadySelected) {
//       favorites.push(cardInfo);

//       localStorage.setItem('favorites', JSON.stringify(favorites));

//       renderCard(cardInfo);
//     }
//   }
// });

// function renderCard(cardInfo) {
//   const listFavoritesContainer = document.querySelector('.list-favorites');

//   const cardMarkup = `
//         <li class="item-favorites" data-id="${cardInfo._id}">
// //             <div class="workout-block">
// //               <p class="workout-title">Workout</p>
// //               <button class="delete-from-fav" type="button">
// //                 <svg class="delete-icon" width="16" height="16">
// //                   <use href="../img/sprite.svg#icon-delete"></use>
// //                 </svg>
// //               </button>
// //             </div>
// //             <button class="start-btn" type="button">
// //               Start
// //               <svg class="arrow-icon" width="14" height="14">
// //                 <use href="../img/sprite.svg#icon-arrow"></use>
// //               </svg>
// //             </button>
// //             <div class="ex-title-block">
// //               <div class="icon-man-wraper">
// //                 <svg class="man-icon" width="16" height="16">
// //                   <use href="../img/sprite.svg#icon-running-man"></use>
// //                 </svg>
// //               </div>
// //               <h3 class="ex-title">${cardInfo.name}</h3>
// //             </div>
// //             <ul class="list-ex-category">
// //               <li>
// //                 <p class="category-text">
// //                   <span class="category-text-accent">Burned calories: ${cardInfo.burnedCalories} </span
// //                   >200/ 3 min
// //                 </p>
// //               </li>
// //               <li>
// //                 <p class="category-text">
// //                   <span class="category-text-accent">Body part: ${cardInfo.bodyPart}: </span>Waist
// //                 </p>
// //               </li>
// //               <li>
// //                 <p class="category-text">
// //                   <span class="category-text-accent">Target: ${cardInfo.target}: </span>Abs
// //                 </p>
// //               </li>
// //             </ul>
// //           </li>
//     `;

//   listFavoritesContainer.insertAdjacentHTML('beforeend', cardMarkup);
// }

// EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
// First variant
// EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
// const addToFavoritesBtn = document.querySelector('.add-to-favorites-btn');
// const removeFromFavoritesBtn = document.querySelector(
//   '.remove-from-favorites-btn'
// );
// const galleryContainer = document.querySelector('.list-favorites');
// // Отримуємо вправу з локального сховища якщо вона там є, якщо так то приховуємо кнопку "Add to favorites", якщо ні ховаємо "Remove"
// const exercise = JSON.parse(localStorage.getItem('favoriteExercise'));
// if (exercise) {
//   addToFavoritesBtn.style.display = 'none';
// } else {
//   removeFromFavoritesBtn.style.display = 'none';
// }
// addToFavoritesBtn.addEventListener('click', () => {
//   // Зберігаємо вправу в локальне сховище
//   localStorage.setItem('favoriteExercise', JSON.stringify(exercise));
//   // Додаємо вправу до галереї
//   const exerciseHTML = `
//     <li class="item-favorites" data-id="${exercise._id}">
//             <div class="workout-block">
//               <p class="workout-title">Workout</p>
//               <button class="delete-from-fav" type="button">
//                 <svg class="delete-icon" width="16" height="16">
//                   <use href="../img/sprite.svg#icon-delete"></use>
//                 </svg>
//               </button>
//             </div>
//             <button class="start-btn" type="button">
//               Start
//               <svg class="arrow-icon" width="14" height="14">
//                 <use href="../img/sprite.svg#icon-arrow"></use>
//               </svg>
//             </button>
//             <div class="ex-title-block">
//               <div class="icon-man-wraper">
//                 <svg class="man-icon" width="16" height="16">
//                   <use href="../img/sprite.svg#icon-running-man"></use>
//                 </svg>
//               </div>
//               <h3 class="ex-title">${exercise.name}</h3>
//             </div>
//             <ul class="list-ex-category">
//               <li>
//                 <p class="category-text">
//                   <span class="category-text-accent">Burned calories: ${exercise.burnedCalories} </span
//                   >200/ 3 min
//                 </p>
//               </li>
//               <li>
//                 <p class="category-text">
//                   <span class="category-text-accent">Body part: ${exercise.bodyPart}: </span>Waist
//                 </p>
//               </li>
//               <li>
//                 <p class="category-text">
//                   <span class="category-text-accent">Target: ${exercise.target}: </span>Abs
//                 </p>
//               </li>
//             </ul>
//           </li>
//     `;
//   galleryContainer.insertAdjacentHTML('beforeend', exerciseHTML);
//   document.querySelector('.message-block-favorites').style.display = 'none';
//   addToFavoritesBtn.style.display = 'none';
//   removeFromFavoritesBtn.style.display = 'block';
// });

// removeFromFavoritesBtn.addEventListener('click', () => {
//   // id вправи, яку треба видалити
//   const exerciseId = exercise._id;

//   // Отримуємо всі вправи з локального сховища
//   const exercises = JSON.parse(localStorage.getItem('favoriteExercise')) || [];

//   // Видаляєм вправу з масиву вправ
//   const updatedExercises = exercises.filter(item => item._id !== exerciseId);
//   localStorage.setItem('favoriteExercise', JSON.stringify(updatedExercises));

//   // Видаляєм вправу з галереї
//   const exerciseCard = document.querySelector(
//     `.item-favorites[data-id="${exerciseId}"]`
//   );
//   if (exerciseCard) {
//     exerciseCard.remove();
//   }

//   removeFromFavoritesBtn.style.display = 'none';
//   addToFavoritesBtn.style.display = 'block';
// });
