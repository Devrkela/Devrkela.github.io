
for(let card of document.querySelectorAll(".carousel > picture")){
  console.log("test")
  const pressed_element = card.querySelector(".pressed");
  const dimension = card.querySelector(".decoration").getBoundingClientRect();

  const max = Math.max(dimension.width, dimension.height);
  const min = Math.min(dimension.width, dimension.height);
  
  pressed_element.style.width = 2 * max + min;
  pressed_element.style.height = 2 * max + min;      

  card.addEventListener("pointerdown" , function pressed(event){
    const dimension = this.querySelector(".decoration").getBoundingClientRect();

    const percent_x = event.clientX - dimension.x - pressed_element.clientWidth/2;
    const percent_y = event.clientY - dimension.y - pressed_element.clientHeight/2;

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