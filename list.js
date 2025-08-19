for(let list of document.querySelectorAll(".list > .item")){
  const pressed_element = list.querySelector(".pressed");
  const dimension = list.querySelector(".decoration").getBoundingClientRect();

  const max = Math.max(dimension.width, dimension.height);
  const min = Math.min(dimension.width, dimension.height);
  
  pressed_element.style.width = 2 * max + min;
  pressed_element.style.height = 2 * max + min;      

  list.addEventListener("pointerup" , function pressed(event){
    const dimension = this.querySelector(".decoration").getBoundingClientRect();

    let percent_x = event.clientX - dimension.x - pressed_element.clientWidth/2;
    let percent_y = event.clientY - dimension.y - pressed_element.clientHeight/2;

    percent_x = Math.min(percent_x, -dimension.width/2);
    percent_y = Math.min(percent_y, -dimension.height/2);

    pressed_element.style.left = percent_x;
    pressed_element.style.top  = percent_y;
    pressed_element.style.transition = "0ms";
    pressed_element.style.transform = null;
    pressed_element.style.opacity = null;

    setTimeout(animate);
    function animate(){
      pressed_element.style.transition = null;

      pressed_element.style.transform = "scale(1)";
      pressed_element.style.opacity = 0;
    }
  });
}


for(let list of document.querySelectorAll(".list > .item")){
  list.addEventListener("pointerdown", function(){
    if(this.hasAttribute("aria-checked")){
      const checkbox = this.querySelector(".checkbox");

      if(this.getAttribute("aria-checked") === "true") {

        if(checkbox) checkbox.setAttribute("aria-checked", "false");
        return this.setAttribute("aria-checked", "false");
      }
      checkbox.setAttribute("aria-checked", "true");
      return this.setAttribute("aria-checked", "true");      
    }
  })
}
