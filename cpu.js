menu_button.addEventListener("click", function(e){
   menu.toggleAttribute("opened")
});

let track = 0;

window.addEventListener("wheel", function(event){
  track += event.deltaY;

  test.innerHTML = track;
});

let last;

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fs.innerHTML = "fullscreen_exit";
    fs.nextSibling.textContent = "Fenêtré";
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
    fs.innerHTML = "fullscreen";
    fs.nextSibling.textContent = "Plein-écran";
  }
}

ask.addEventListener("click", toggleFullScreen);

let card_angle = 0;
const left = document.querySelector(".cards_section .left");
const right = document.querySelector(".cards_section .right");

left.addEventListener("pointerup", function(){
  card_angle = card_angle +(360 / 6);
  document.querySelector(".cards_section > .cards").style.transform = `perspective(1000px) rotateY(${card_angle}deg)`;
})

right.addEventListener("pointerup", function(){
  card_angle = card_angle - (360 / 6);

  document.querySelector(".cards_section > .cards").style.transform = `perspective(1000px) rotateY(${card_angle}deg)`;
})