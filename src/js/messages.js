// post-запит
import { postApiInfo } from './api.js';

import iziToast from 'izitoast';

// you have successfully subscribed.
// pls, enter correct data.
// this email is already registered, pls choose another one.
// we're sorry, but nothing was found for your request.

export function warningEmail() {
  iziToast.warning({
    id: 'email-exists',
    class: 'email-exists',
    message: 'this email is already registered, pls choose another one.',
    theme: 'dark',
    messageSize: '18px',
    messageColor: '#1B1B1B99',
    backgroundColor: '#EEA10C',
    color: '#EEA10C',
    position: 'topRight',
    transitionIn: 'fadeInLeft',
    transitionOut: 'fadeOutRight',
    transitionInMobile: 'fadeInLeft',
    transitionInMobile: 'fadeOutRight',
    maxWidth: '390px',
    timeout: 5000,
    closeOnEscape: 'true',
  });
}

export function errorNotification() {
  iziToast.error({
    id: 'wrong-search-data',
    class: 'wrong-search-data',
    message: 'pls, enter correct data.',
    theme: 'dark',
    messageSize: '18px',
    messageColor: 'white',
    backgroundColor: '#dd1e08',
    color: '#dd1e08',
    position: 'topRight',
    transitionIn: 'fadeInLeft',
    transitionOut: 'fadeOutRight',
    transitionInMobile: 'fadeInLeft',
    transitionInMobile: 'fadeOutRight',
    maxWidth: '390px',
    timeout: 5000,
    closeOnEscape: 'true',
  });
}

function info() {
  iziToast.info({
    id: 'found-nothing',
    class: 'found-nothing',
    message: "we're sorry, but nothing was found for your request.",
    theme: 'dark',
    messageSize: '18px',
    messageColor: 'white',
    position: 'topRight',
    transitionIn: 'fadeInLeft',
    transitionOut: 'fadeOutRight',
    transitionInMobile: 'fadeInLeft',
    transitionInMobile: 'fadeOutRight',
    maxWidth: '390px',
    timeout: 5000,
    closeOnEscape: 'true',
  });
}

export function success() {
  iziToast.success({
    id: 'enter-success',
    class: 'enter-success',
    message: 'Great! You have successfully subscribed.',
    messageColor: '#1b1b1b',
    messageSize: '18px',
    messageLineHeight: '1.2',
    backgroundColor: '#F6F6F6',
    color: '#F6F6F6',
    maxWidth: '390px',
    position: 'topRight',
    timeout: 5000,
    transitionIn: 'fadeInLeft',
    transitionOut: 'fadeOutRight',
    transitionInMobile: 'fadeInLeft',
    transitionInMobile: 'fadeOutRight',
    closeOnEscape: 'true',
  });
}
