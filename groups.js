for(let button of document.querySelectorAll("button")){
  button.addEventListener("pointerdown", function(){
    if(this.getAttribute("aria-pressed") === "true") return this.setAttribute("aria-pressed", "false");
    return this.setAttribute("aria-pressed", "true");
  })
}