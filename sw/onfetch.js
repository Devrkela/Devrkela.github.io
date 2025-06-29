(function(){
  const local = "sw." + self.location.host;

  const routes = {GET:{}, POST:{}, PUT:{}, DELETE:{}};

  routes["GET"][""] = root;
  
  function root(){
    return new Response();  
  };
  
  function localserver(event){
    const request = event.request;
    const path = new URL(event.request.url).pathname.split("/");

    path.shift();

    const first = path.shift();

    if(self[first][request.method] instanceof Function){
      return event.respondWith(self.db[request.method](request));
    }

    const fail = new Response(null, {status:404});

    return event.respondWith(fail);
  };
  
  function router(event){
    if(new URL(event.request.url).host === local) return localserver(event);
  }

  self.onfetch = router;
})();