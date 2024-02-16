import iziToast from 'izitoast';
import { warningEmail, errorNotification, success } from './messages';
import { postApiInfo } from './api';

const form = document.querySelector('#subscribe-form');
const inputFooter = document.querySelector('#footer-input');

const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

form.addEventListener('submit', async e => {
  e.preventDefault();

  const email = form.elements.email.value.trim().toLowerCase();

  if (!email.match(regex)) {
    inputFooter.style.borderColor = 'red';
    errorNotification();
    return;
  }

    const result = await subscribe(email);
    inputFooter.style.borderColor = '#7e847f';

  if (result) {
    success();
  }
  form.reset();
});

async function subscribe(email) {
  try {
    const result = await postApiInfo({ email }, 'subscription');
    return result;
  } catch (error) {
    if (error.response.status === 409) {
      warningEmail();
      return;
    }
    errorNotification();
  }
}
