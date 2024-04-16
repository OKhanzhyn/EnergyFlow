import{a as f,i as m}from"./vendor-db25513e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}})();const M="/EnergyFlow/assets/icons-66c1ea1d.svg",g=document.querySelector(".js-close-menu"),y=document.querySelector(".js-open-menu"),i=document.querySelector(".js-menu-container");g.addEventListener("click",h);y.addEventListener("click",S);function h(){i.classList.add("is-hidden")}function S(){i.classList.remove("is-hidden")}const L="https://energyflow.b.goit.study/api",l=document.querySelector(".quote__backend");async function T(){l.innerHTML='<span class="loader"></span>';try{return(await f.get(`${L}/quote`)).data}catch(e){throw m.error({title:"Wrong",message:"Try again",position:"topRight"}),e}}function b(e,o){return`<p class="quote__backend-text">${o}</p>
    <p class="quote__backend-author">${e}</p>`}async function v(){try{const{author:e,quote:o}=await T(),r={author:e,quote:o,savedDate:new Date().toLocaleDateString()};localStorage.setItem("quote",JSON.stringify(r)),localStorage.setItem("savedDate",r.savedDate),u(e,o)}catch(e){console.error(e)}}function u(e,o){l.innerHTML=b(e,o)}async function d(){const e=JSON.parse(localStorage.getItem("quote")),o=localStorage.getItem("savedDate"),r=new Date().toLocaleDateString();e&&o===r?u(e.author,e.quote):await v()}d();function p(){const e=new Date,o=new Date(e.getFullYear(),e.getMonth(),e.getDate()+1,0,0,0,0)-e;setTimeout(function(){d(),p()},o)}p();let c=document.getElementById("scrollToTopBtn");window.onscroll=function(){w()};function w(){document.body.scrollTop>20||document.documentElement.scrollTop>20?c.style.display="block":c.style.display="none"}c.addEventListener("click",D);function D(){document.body.scrollTop=0,document.documentElement.scrollTop=0}export{M as i};
//# sourceMappingURL=scroll-to-top-btn-7e7e0997.js.map