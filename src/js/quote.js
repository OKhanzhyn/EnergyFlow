import { getApiInfo } from './api.js';

const LOCAL_KEY_DATE = 'dateNow';
const LOCAL_KEY_QUOTE = 'quoteDay';

const quotePage = document.getElementById('description');
const authorPage = document.getElementById('author-quote');

function getQuote() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getFullYear()}`;
  const getDate = localStorage.getItem(LOCAL_KEY_DATE);

  if (getDate === formattedDate) {
    const localInfo = JSON.parse(localStorage.getItem(LOCAL_KEY_QUOTE));

    // Перевірка, чи є дані в localStorage
    if (localInfo) {
      const { author, quote } = localInfo;
      quotePage.textContent = quote;
      authorPage.textContent = author;
    } else {
      // Якщо дані в localStorage відсутні, викликаємо getApiInfo для отримання нових даних
      fetchQuote();
    }
    return;
  }

  if (!getDate || getDate !== formattedDate) {
    localStorage.setItem(LOCAL_KEY_DATE, formattedDate);

    // Викликаємо getApiInfo для отримання нових даних
    fetchQuote();
  }
}

function fetchQuote() {
  getApiInfo({ type: 'quote' })
    .then(({ data }) => {
      const { author, quote } = data;

      const quoteOfTheDay = {
        author: author,
        quote: quote,
      };
      localStorage.setItem(LOCAL_KEY_QUOTE, JSON.stringify(quoteOfTheDay));

      quotePage.textContent = quote;
      authorPage.textContent = author;
    })
    .catch(err => {
      console.error('Error fetching quote:', err);
    });
}

getQuote();


