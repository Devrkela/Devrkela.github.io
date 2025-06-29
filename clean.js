const menu = document.querySelector("[role=menu]");

const links = document.querySelectorAll("* a");

function route (event){
  const href = event.target.getAttribute("href");
  
  window.history.pushState({}, window.title, href);

  event.preventDefault();
};

for(let link of links){
  link.addEventListener("click", route);
  console.log(link)
}