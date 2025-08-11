(function(){
  const appbar = document.querySelector(".appbar");

  function scroll(e){
    if(document.body.scrollTop) {
      return appbar.classList.add("scrolling");
    }

    return appbar.classList.remove("scrolling");
  };
  
  document.addEventListener("scroll", scroll, {capture:true});
})()