document.querySelector(".outils").addEventListener("click",function(){
  document.body.classList.toggle("open");
});

document.querySelector("#quitter").addEventListener("click",function(){
  document.body.classList.toggle("open");
});

document.querySelectorAll(".input .content").forEach(
  function(element){
    element.innerHTML = " ";
    element.addEventListener("keydown", function(event){
      const element = this;
      if(event.code === "Backspace" && element.textContent === ""){
        return event.preventDefault();
      };
  
      setTimeout(function(){

        if(element.textContent === ""){
          element.nextElementSibling.textContent = element.nextElementSibling.getAttribute("placeholder");
          return;
        };
  
        element.nextElementSibling.textContent = "";
      });
    });
  }
);