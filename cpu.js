import "./sw/register.js";
import "./model.js";

const icons = {
  "poid":"weight",
  "repetition":"redo",
  "second":"timer"
};

const text = {
  "poid":"kg",
  "repetition":"rep",
  "second":"sec" 
}

const template = document.createElement("div");
template.setAttribute("class","exercice");

template.innerHTML = `
<h4 class="titre"></h4>
                    <div class="info">
                        <div class="general">
                            <div class="level">   
                           </div>
                            <div class="xp">   
                            </div>
                        </div>
                        <div class="bar">
                            <div class="thumb"></div>
                        </div>
                    </div>
                    <button class="edit_exercice">
                        <span class="material-symbols-outlined">
                            edit
                        </span> 
                    </button>`;

const test = model.echauffement[0];

function buildNode(exercice){
  const node = template.cloneNode(true);

  node.querySelector(".titre").innerHTML = exercice.nom;

  const level = `<span class="material-symbols-outlined">${icons[exercice.level.type]}</span> ${exercice.level.value} ${text[exercice.level.type]}`;
  const xp = `<span class="material-symbols-outlined">${icons[exercice.xp.type]}</span> ${exercice.xp.sets}x${exercice.xp.value} ${text[exercice.xp.type]}`;

  node.querySelector(".level").innerHTML = level;
  node.querySelector(".xp").innerHTML = xp;

  node.data = exercice;

  return node;
};

function buildSection(section, exercices){
  for(let exercice of exercices){
    section.appendChild(buildNode(exercice));
  }
}

buildSection(document.querySelector(".echauffement .list"), model.echauffement);
buildSection(document.querySelector(".figures .list"), model.figures);
buildSection(document.querySelector(".pull .list"), model.pull);
buildSection(document.querySelector(".push .list"), model.push);
buildSection(document.querySelector(".leg .list"), model.leg);

let current = 0;
function move(value){
  
  current = Math.max(-400, Math.min(0, current + value));

  console.log(current)
  document.querySelector("main").style.transform = `translateX(${current}vw)`;
}

document.querySelector(".next").addEventListener("click", function(){
  move(-100);
});

document.querySelector(".previous").addEventListener("click", function(){
  move(100);
});


let installPrompt = null;
const installButton = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.removeAttribute("hidden");
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) {
    return;
  }
  const result = await installPrompt.prompt();
  console.log(`Install prompt was: ${result.outcome}`);
  installPrompt = null;
  installButton.setAttribute("hidden", "");
});

