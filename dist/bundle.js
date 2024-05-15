!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const a=(e,t)=>{const n=[];for(let a=e;a<=t;a++)n.push(a);return n},r=()=>{const e=document.querySelector(".calendar__time-scale");e.innerHTML="";a(1,23).forEach(t=>{const n=document.createElement("div");n.classList.add("time-slot");const a=document.createElement("span");let r;a.classList.add("time-slot__time"),0===t?(r=12,a.textContent=r+" AM"):t<12?(r=t,a.textContent=r+" AM"):12===t?(r=t,a.textContent=r+" PM"):(r=t-12,a.textContent=r+" PM"),n.setAttribute("data-hour",t),n.append(a),e.append(n)})};r();const s=(e,t)=>localStorage.setItem(e,JSON.stringify(t)),o=e=>JSON.parse(localStorage.getItem(e))||[],c=(new Date("2020-03-17T01:10:00.000Z"),new Date("2020-03-17T04:30:00.000Z"),{years:"getFullYear",months:"getMonth",days:"getDate",hours:"getHours",minutes:"getMinutes",seconds:"getSeconds",milliseconds:"getMilliseconds"}),d={years:"setFullYear",months:"setMonth",days:"setDate",hours:"setHours",minutes:"setMinutes",seconds:"setSeconds",milliseconds:"setMilliseconds"};var i=e=>{let t=new Date(e);return{add(e,n){const a=t[c[e]]();return t=new Date(t[d[e]](a+n)),this},subtract(e,t){return this.add(e,-t)},result:()=>t}};const l=e=>{const t=new Date(e),n=t.getDay(),a=0===n?-6:1-n,r=new Date(t.setDate(e.getDate()+a));return new Date(r.getFullYear(),r.getMonth(),r.getDate())},u=e=>{const t=[];for(let n=0;n<7;n+=1){const a=new Date(e);t.push(new Date(a.setDate(a.getDate()+n)))}return t},m=(e,t)=>{const[n,a]=t.split(":"),r=new Date(new Date(e).setHours(Number(n)));return new Date(new Date(r).setMinutes(Number(a)))},p=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],y=document.querySelector(".popup"),f=document.querySelector(".popup__content");function D(){y.classList.add("hidden")}f.addEventListener("click",(function(e){e.stopPropagation()})),y.addEventListener("click",D);const g="https://661cc3b1e7b95ad7fa6b0d59.mockapi.io/api/v1/tasks",v=async()=>await fetch(g).then(e=>e.json()),S=document.querySelector(".calendar__week"),h=document.querySelector(".delete-event-btn");const w=()=>{document.querySelectorAll(".event").forEach(e=>e.remove());(()=>{const e=o("events")||[],t=[];return e.map(e=>{const n=new Date(o("displayedWeekStart")),a=new Date(n);a.setDate(a.getDate()+6);const r=new Date(e.start),s=new Date(e.end);r>=n&&s<=a&&t.push(e)}),t})().forEach(e=>{const t=(e=>{const t=document.createElement("div");t.classList.add("event"),t.setAttribute("description",e.description),t.setAttribute("id",e.id),t.setAttribute("title",e.title),t.setAttribute("start",e.start),t.setAttribute("end",e.end),t.textContent=e.title;const n=new Date(e.start),a=(new Date(e.end)-n)/6e4;return t.style.height=a+"px",t})(e),n=new Date(e.start).getHours(),a=new Date(e.start).getMinutes(),r=new Date(e.start).getDate();t.style.top=a+"px";const s=document.querySelector(`.calendar__day[data-day="${r}"]`);if(s){const e=s.querySelector(`.calendar__time-slot[data-time="${n}"]`);e&&e.append(t)}})};h.addEventListener("click",(function(){let e=o("events")||[];const t=o("eventIdToDelete");e=e.filter(e=>e.id!==t),s("events",e),(async e=>await fetch(`${g}/${e}`,{method:"DELETE"}))(t).then(()=>v()).then(e=>{s("events",e),w()}).catch(e=>{console.error(e)}),D()})),S.addEventListener("click",(function(e){const t=e.target.closest(".event");var n,a;t&&(y.classList.remove("hidden"),f.style.top=a+"px",f.style.left=n+"px",s("eventIdToDelete",t.id))}));const _=()=>{const e=o("displayedWeekStart");if(null===e)return;const t=u(e),n=document.querySelector(".calendar__week");n.innerHTML="",t.forEach((e,t)=>{const r=document.createElement("div");r.classList.add("calendar__day"),r.dataset.day=e.getDate();const s=a(0,23).map(e=>`<div class='calendar__time-slot' data-time='${e}'></div>`).join("");r.innerHTML=s,n.appendChild(r)}),w()},b=document.querySelector(".modal"),L=(document.querySelector(".modal__content"),["sun","mon","tue","wed","thu","fri","sat"]),E=document.querySelector(".create-event-btn"),M=()=>{const e=o("displayedWeekStart")||new Date,t=u(e),n=new Date,a=document.querySelector(".calendar__header");a.innerHTML="",t.forEach(e=>{const t=document.createElement("div");t.classList.add("calendar__day-label","day-label");const r=document.createElement("span");r.classList.add("day-label__day-name"),r.textContent=L[e.getDay()];const s=document.createElement("span");s.classList.add("day-label__day-number"),s.textContent=e.getDate(),t.setAttribute("data-date",e.toISOString()),t.append(r,s),a.append(t),e.getDate()===n.getDate()&&(r.classList.add("day-name_current"),s.classList.add("day-number_current"))})};E.addEventListener("click",()=>{b.classList.remove("hidden")});const k=document.querySelector(".navigation"),x=document.querySelector(".navigation__displayed-month");function q(){const e=(e=>{const t=l(e),n=i(e).add("days",6).result(),a=t.getMonth(),r=t.getFullYear(),s=n.getMonth(),o=n.getFullYear();if(a===s)return`${p[a]} ${r}`;return r===o?`${p[a]} - ${p[s]} ${r}`:`${p[a]} ${r} - ${p[s]} ${o}`})(new Date);x.textContent=e}const O=e=>{const t=e.target.dataset.direction;if("today"===t){const e=new Date,t=l(e);return s("displayedWeekStart",t.toISOString()),M(),void _()}const n=o("displayedWeekStart");if(n){let e;"prev"===t?(e=new Date(n),e.setDate(e.getDate()-7)):"next"===t&&(e=new Date(n),e.setDate(e.getDate()+7)),s("displayedWeekStart",e.toISOString()),M(),_(),q()}else console.error("Value for 'displayedWeekStart' not found in storage.")},T=document.querySelector(".event-form"),$=T.querySelectorAll("input, textarea"),A=document.querySelector(".create-event__close-btn");function j(){b.classList.add("hidden"),$.forEach(e=>(e.tagName,e.value=""))}const C=async e=>{e.preventDefault();const t=Object.fromEntries(new FormData(T)),{date:n,startTime:a,endTime:r,title:o,description:c}=t,d=m(n,a),i=m(n,r),l={id:Date.now().toString(),title:o,description:c,start:d,end:i};if(o&&c&&null!==l.start&&null!==l.end)try{await(async e=>await fetch(g,{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(e)}))(l);const e=await v();s("events",e),w(),j()}catch(e){console.error(e)}else alert("fill in the fields")};document.addEventListener("DOMContentLoaded",()=>{r(),s("displayedWeekStart",l(new Date)),_(),M(),q(),k.addEventListener("click",O),T.addEventListener("submit",C),A.addEventListener("click",j)})}]);