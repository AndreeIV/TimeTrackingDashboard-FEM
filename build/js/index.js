const getData=fetch("data.json").then((e=>e.json())).then((e=>(console.log(e),e))).catch((e=>console.log(e))),active=document.querySelector(".active");active.style.color="#bdc1ff";const timeFramesActive=e=>{for(const t of time)e==t.innerText.toLowerCase()?t.style.color="#bdc1ff":(t.style.color="#6f76c8",active.classList.remove("active"))},createTemplate=e=>{let t=e.target.innerText.toLowerCase();timeFramesActive(t),getData.then((e=>{e.forEach((e=>{const a=document.querySelectorAll("#container__work");let r,c,o;for(let s of a){let a=s.dataset.name,l=e.title;switch(t){case"daily":r=e.timeframes.daily.current,c=e.timeframes.daily.previous,o="Last Day";break;case"weekly":r=e.timeframes.weekly.current,c=e.timeframes.weekly.previous,o="Last Week";break;case"monthly":r=e.timeframes.monthly.current,c=e.timeframes.monthly.previous,o="Last Month";break;default:return}a==l&&(s.innerHTML=`\n                    \n                        <h2 class="hours">${r}hrs</h2>\n                        <h3 class="last">${o} - ${c}hrs</h3>\n\n                    `)}}))}))},getButton=()=>{document.querySelectorAll("#time").forEach((e=>{e.addEventListener("click",createTemplate)}))};document.querySelectorAll("#time").forEach((e=>{e.addEventListener("click",createTemplate)}));
//# sourceMappingURL=index.js.map
