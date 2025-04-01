menu_button.addEventListener("click", function(e){
   menu.toggleAttribute("opened")
});

let track = 0;

window.addEventListener("wheel", function(event){
  track += event.deltaY;

  test.innerHTML = track;
});

let last;

window.addEventListener("touchstart", function(event){
  last = event.touches[0].clientY;  
});

window.addEventListener("touchmove", function(event){
  const diff = last - event.touches[0].clientY;
  track += diff;
  test.innerHTML = track;
  last = event.touches[0].clientY;

});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fs.innerHTML = "fullscreen_exit";
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
    fs.innerHTML = "fullscreen";
  }
}

ask.addEventListener("click", toggleFullScreen);

let card_angle = 0;
const left = document.querySelector(".cards_section .left");
const right = document.querySelector(".cards_section .right");

left.addEventListener("click", function(){
  card_angle = card_angle +(360 / 6);
  document.querySelector(".cards_section > .cards").style.transform = `perspective(1000px) rotateY(${card_angle}deg)`;
})

right.addEventListener("click", function(){
  card_angle = card_angle - (360 / 6);

  document.querySelector(".cards_section > .cards").style.transform = `perspective(1000px) rotateY(${card_angle}deg)`;
})