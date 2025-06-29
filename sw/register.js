(function(){
  function registered(registration){
    console.log(registration)
    if(registration.active){
      const headers = {};
      
      headers["databasename"]         = "exercices";
      headers["databaseversion"]      = "1";
      headers["objectstorename"]      = "machines";
      headers["objectstoretype"]      = "range";
      headers["objectstorekey"]       = "1";
      headers["objectstorelower"]     = "1";
      headers["objectstoreupper"]     = "10";
/**
      fetch("http://sw.localhost:3000/db", {headers}).then(function(res){
        return res.json();
      }).then(console.log);
      **/
    }
  }

  function change(){
    console.log("sw change");
  }
  if(!navigator.serviceWorker){
    return ;
  }
  navigator.serviceWorker.register("/sw.js");
  navigator.serviceWorker.addEventListener("statechange",change);

  navigator.serviceWorker.ready.then(registered)
})();