(function(){
  // TMP
      /**
      function check(){
        const open = self.indexedDB.open("exercices", "1");

        open.addEventListener("success", function(event){
          const database = open.result;

          const transaction = database.transaction(database.objectStoreNames);

          for(let object_store of json.object_stores){
            const objectStore = transaction.objectStore(object_store.name);

            const request = objectStore.getAll();

            request.onsuccess = function(event){
              console.log(event.target.result);
            }
          }

        });
      }
      setTimeout(check, 1000);
      **/
  let model;
  let firstInstall = false;
  
  // Fonctions utilitaires.

  /**
    ASYNC
      Prend en paramêtre la réponse d'une requête.
      
      Retourne un objet JSON.
  **/
  function toJSON(response){
    return response.json();
  }

  /**
    ASYNC
      Prend en paramêtre une requête de la base de donnée
      
      Retourne la requête en cas de succés.
      Sinon, retourne une erreur.
  **/
  function wait(idbrequest){
    
    function execute(resolve, reject){
      function onsuccess(){
        resolve(idbrequest);
      }

      function onerror(){
        reject(idbrequest.error);
      }
      
      idbrequest.onerror   = onerror;
      idbrequest.onsuccess = onsuccess;
    }
    
    return new Promise(execute);
  }

  /**
    ASYNC
      Prend en paramêtre un événement contenant une transaction avec les
      informations permettant de remplir le magasin d'objet.
      
      Pour chaque information, on récupére les données sur le serveur
      puis on remplit le magasin.
  **/

  function prepopulate(event){
    const database = event.target.db;

    for(let info of event.target.populate){
      fetch(info.url).then(toJSON).then(populate.bind(null, database, info.name));
    }
  };

  /**
    SYNC
      Prend en paramêtre une base de donnée, le nom du magasin d'objet et 
      les données à remplir.
  
      Récupére le magasin d'objet puis remplis celui-ci avec les données;
  **/
  function populate(database, objectstore_name, items){  
    const transaction = database.transaction(objectstore_name, "readwrite");
    const objectstore = transaction.objectStore(objectstore_name);

    for(let item of items){
      objectstore.add(item);
    }

    transaction.oncomplete = function(){
      const objectstore = database.transaction(objectstore_name, "readwrite").objectStore(objectstore_name);

      wait(objectstore.getAll()).then(console.log);
    }
  }

  /**
    ASYNC
      Prend en paramêtre le nom et la version de la base de donnée.

      Ouvre la base de donnée.
  **/
  function openDatabase(name, version){
    return wait(self.indexedDB.open(name, version));
  }

  /**
    Prend en paramêtre les informations sur les bases de données.

    Pour chaque base de donnée, ouvre celle-ci et retourne un tableau
    avec les bases de données.
  **/
  function openDatabases(databases){
    const promises = [];

    for(let name in databases){
      promises.push(openDatabase(name, databases[name].version));
    }

    return Promise.all(promises);
  }

  /**
    Prend en paramêtre le modéle des bases de données du serveur
    
    Sauvegarde le modêle dans la base de donnée.
  **/
  function updateModel(model, event){
    const database = event.target.db;
    
    database.transaction("model", "readwrite").objectStore("model").put(model);
  }

  /**
    Prend en paramêtre le modéle des bases de donnée et un événement généré
    par onupgradeneeded.

    Notifie que c'est la premiére installation 
    ,puis pour chaque bases de donnée, la met à niveau.
  **/
  function createDatabases(model, event){
    firstInstall = true;
    const database = event.target.result;

    for(let database_name of model.databaseNames){
      upgradeDatabase(database_name, model.databases[database_name]);
    }
    
    const objectstore = database.createObjectStore("model", {keyPath: "id"});
    
    objectstore.transaction.oncomplete = updateModel.bind(null, model);
        
  }

  /**
    Prend en paramêtre le nom de la base de donnée.

    Supprime la base de donnée.
  **/
  function deleteDatabase(name){
    self.indexedDB.deleteDatabase(name);
  }

  /**
    Prend en paramêtre le nom de la base de donnée et le modêle de
    celle-ci.

    Ouvre la base de donnée et met à niveau les magasins d'objet de celle-ci.
  **/
  function upgradeDatabase(name, newModel){
    const request = self.indexedDB.open(name, newModel.version);

    request.onupgradeneeded = upgradeObjectStores.bind(null, newModel);
  }

  /**
    Prend en paramêtre l'ancien modéle des bases de donnée et un évenement
    onupgradeneeded.

    Si les deux modéles ont la même version, on ne fait rien.
    Sinon, on supprime les bases de données puis on met à niveau les
    bases de donnée du nouveau modéle.
  **/
  function upgradeDatabases(oldModel, event){
    const newModel = event.target.result;

    if(oldModel.version === newModel.version) return;

    for(let database_name of oldModel.databaseNames){
      if(!newModel.databases_name.includes(database_name)) deleteDatabase(database_name, oldModel.databases[database_name], newModel.databases[database_name]);
    }

    for(let database_name of newModel.databaseNames){
      upgradeDatabase(database_name, oldModel.databases[database_name],newModel.databases[database_name]);
    }
  }

  /**
    Prend en paramêtre le model des bases de données et un événement "onsuccess".
    
    Si la base de donnée "model" n'existe pas, on ne fait rien.
    Sinon, on récupére l'ancien modéle et on met à niveau les bases de donnée
    puis on met à jour le modéle dans la base de donnée.
  **/
  function getModel(model, event){
    if(firstInstall) return;

    const database = event.target.result;

    const transaction = database.transaction("model", "readonly");
    const request = transaction.objectStore("model").get(1);

    wait(request).then(upgradeDatabases.bind(null, model)).finally(updateModel.bind(this, model, event));
  }

  /**
    Prend en paramêtre le modéle des bases de données.

    Ouvre la base de donnée modéle et crée ou modifie les bases de données.
  **/
  function installDatabases(model){
    const request = self.indexedDB.open("model", model.version);

    request.onsuccess       = getModel.bind(null, model);
    request.onupgradeneeded = createDatabases.bind(null, model);
  }

  /**
    Prend en paramêtre un modéle des index et un magasin d'objet.

    Crée l'index dans le magasin d'objet.
  **/
  function createIndex(model, objectstore){
    return objectstore.createIndex(model.name, model.keyPath, model);
  }

  /**
    Prend en paramêtre le nom de l'index et un magasin d'objet.

    Supprime l'index du le magasin d'objet.
  **/
  function deleteIndex(name, objectstore){
    return objectstore.deleteIndex(name);
  }

  function createObjectStore(name, model, database){
    const objectstore = database.createObjectStore(name, model);

    for(let index_name of model.indexNames){
      createIndex(model.indexes[index_name], objectstore)
    }

    if(model.populate){
      const store = {name, url: model.populate};

      if(objectstore.transaction.populate) objectstore.transaction.populate.push(store);
      else objectstore.transaction.populate = [store];
      
      objectstore.transaction.oncomplete = prepopulate;    
    }
  }
  
  function upgradeObjectStore(name, model, objectstore){
    for(let index_name of objectstore.indexNames){
      if(!model.indexNames.includes(index_name)) deleteIndex(index_name, objectstore);
    }

    for(let index_name of model.indexNames){
      if(!objectstore.indexNames.contains(index_name)) createIndex(objectstore.index[index_name], objectstore);
    }
  }

  function upgradeObjectStores(newModel, event){
    const database = event.target.result;

    for(let objectstore_name of database.objectStoreNames){
      if(!newModel.objectstores_name.includes(objectstore_name)) deleteObjectStore(objectstore_name);
    }

    for(let objectstore_name of newModel.objectStoreNames){
      if(!database.objectStoreNames.contains(objectstore_name)) createObjectStore(objectstore_name, newModel.objectstores[objectstore_name], database);
      else upgradeObjectStore(objectstore_name, newModel.objectstores[objectstore_name], event.transaction.objectStore(objectstore_name));
    }
  }

  // Fonctions d'événement.

  /**
    Récupére les modéles des bases de données les plus fraiches.
    Ensuite, ouvre les bases de données puis les met à niveau.
  **/
  function install(){
    return fetch("/db/latest.json").then(toJSON).then(installDatabases).catch(console.error);
  }

  /**
  function open(request){
    const database_name    = request.headers.get("databasename");
    const database_version = request.headers.get("databaseversion");

    function openDatabase(resolve, reject){
      const opening = self.indexedDB.open(database_name, database_version);

      opening.onsuccess = resolve;
      opening.onerror   = reject;
    }
    
    return new Promise(openDatabase)
  };

  function getOne(object_store, key, resolve, reject){
    const item_request = object_store.get(key);

    function onsuccess(result){
      const response = new Response(JSON.stringify(item_request.result), {headers:{"Content-Type": "application/json"}})
      resolve(response);
    }

    function onerror(){
      const response = new Response(null, {status:404, statusText: transaction.error});
      reject(response)
    }
    item_request.onsuccess = onsuccess;
    item_request.onerror   = onerror;
  };

  function getAll(object_store, resolve, reject){
    const item_request = object_store.getAll();

    function onsuccess(result){
      const response = new Response(JSON.stringify(item_request.result), {headers:{"Content-Type": "application/json"}})
      resolve(response);
    }

    function onerror(){
      const response = new Response(null, {status:404, statusText: transaction.error});
      reject(response)
    }
    item_request.onsuccess = onsuccess;
    item_request.onerror   = onerror;
  };

  function getRange(object_store, range, resolve, reject){
    const item_request = object_store.openCursor(range, "next");

    function wait(){
      function waitCursor(resolve, reject){
        item_request.onsuccess = resolve;
        item_request.onreject  = reject;
      }

      return new Promise(waitCursor);
    }
    function iterate(cursor){
      function getValue(result){
        result.push(cursor.value)
        cursor.continue();

        if(cursor.value.id < range.upper){
          return wait().then(getValue.bind(null, result));        
        }

        return Promise.resolve(result);
      };
      
      return getValue([]);
    }
    
    function onsuccess(){
      const cursor = item_request.result;

      function sendResponse(result){
        const response = new Response(JSON.stringify(result), {headers:{"Content-Type": "application/json"}})
        resolve(response);
      }
      
      iterate(cursor).then(sendResponse);
    }

    function onerror(){
      const response = new Response(null, {status:404, statusText: transaction.error});
      reject(response)
    }
    item_request.onsuccess = onsuccess;
    item_request.onerror   = onerror;
  }
  
  function _get   (request){  
    const objectstore_name   = request.headers.get("objectstorename");
    const objectstore_key    = parseInt(request.headers.get("objectstorekey"));
    const objectstore_lower  = parseInt(request.headers.get("objectstorelower"));
    const objectstore_upper  = parseInt(request.headers.get("objectstoreupper"));
    const objectstore_type   = request.headers.get("objectstoretype");
  
    function getItem(idbrequest){
      function idbGet(resolve, reject){
        const database = idbrequest.target.result;
  
        const transaction  = database.transaction(objectstore_name, "readonly");
        const object_store = transaction.objectStore(objectstore_name);

        if(objectstore_type === "single") getOne  (object_store, objectstore_key, resolve, reject);
        if(objectstore_type === "all")    getAll  (object_store, resolve, reject);
        if(objectstore_type === "range")  getRange(object_store, IDBKeyRange.bound(objectstore_lower, objectstore_upper),  resolve, reject);

      }
      
      return new Promise(idbGet);
    }
    
    return open(request).then(getItem);
  }

  function _post  (request){
    open(request);
    return new Response();
  }

  function _put   (request){
    open(request);
  }

  function _delete(request){
    open(request);    
  }
  
  self.db = {
    GET   : _get,
    POST  : _post,
    PUT   : _put,
    DELETE: _delete,
  };
  **/
  self.addEventListener("install", function(event){
    event.waitUntil(install());
  });
})();