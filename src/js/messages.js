// get-запит
import { getApiInfo } from './api.js'

// post-запит
import { postApiInfo } from './api.js' 

// you have successfully subscribed.
// pls, enter correct data.
// this email is already registered, pls choose another one.
// we're sorry, but nothing was found for your request.

iziToast.warning({
    id: 'email-exists', 
    class: 'email-exists',
    message: "this email is already registered, pls choose another one.",
    theme: 'dark',
    messageSize: '16px',
    messageColor: 'var(--c-black-tr60)',
    backgroundColor: 'var(--c-filled-stars)',
    color: 'var(--c-filled-stars)',
    position: 'topRight',
    transitionOut: ' fadeOutRight',
    transitionInMobile: 'fadeInUp',
    maxWidth: '390px',
    timeout: 5000,
}); 

iziToast.error({
    id: 'wrong-search-data', 
    class: 'wrong-search-data',
    message: "pls, enter correct data.",
    theme: 'dark',
    messageSize: '16px',
    messageColor: 'white',    
    backgroundColor: '#6C8CFF',
    color: '#6C8CFF',
    position: 'topRight',
    transitionOut: ' fadeOutRight',
    transitionInMobile: 'fadeInUp',
    maxWidth: '390px',
    timeout: 5000,
}); 

iziToast.info({
    id: 'found-nothing', 
    class: 'found-nothing',
    message: "we're sorry, but nothing was found for your request.",
    theme: 'dark',
    messageSize: '16px',
    messageColor: 'white',
    backgroundColor: '#1d86e933',
    color: '#1d86e933',
    position: 'topRight',
    transitionOut: ' fadeOutRight',
    transitionInMobile: 'fadeInUp',
    maxWidth: '390px',
    timeout: 5000,
}); 

iziToast.success({
    id: 'enter-success', 
    class: 'enter-success', 
    message: 'Great! You have successfully subscribed.',
    messageColor: '#1b1b1b',
    messageSize: '16px',
    messageLineHeight: '1.2',
    backgroundColor: '#F6F6F6',
    //theme: 'light', // dark
    color: '#F6F6F6', // blue, red, green, yellow
    maxWidth: '390px',
    position: 'bottomRight',
    timeout: 5000,
    transitionIn: ' fadeInLeft',
    transitionOut: ' fadeOutRight',   
});