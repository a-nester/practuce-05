(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const c=prompt("Enter value");function u(r){return new Promise((o,n)=>{const s=Number(r);Number.isNaN(s)?n("Error"):s%2===0?setTimeout(()=>o("Even"),1e3):s%2!==0&&setTimeout(()=>o("Odd"),2e3)})}u(c).then(r=>console.log(r)).catch(r=>console.log(r));
//# sourceMappingURL=commonHelpers.js.map
