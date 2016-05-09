/*
 * index.js
 */

var self = this; // set the context locally, for access protection

/**
 * Create a new Main that let users create sub-main.
 * @return {Main}
 */
function Main() { 
  // add key value pairs here
  // self's are not directly publicly accessible, only through their public method(s)
  // use self's here for protection from direct access
  self._configuration = {}; // will be set
  self._instructions = {}; // will be set
  self._proxies = {}; // will be set, before passing on to mapping
  self._resource = {}; // will be set, before passing on to mapping
  self._start = this.start; // a function that returns a promise
  self._stop = this.stop; // a function that returns a promise
  self._setconfiguration = this.setconfiguration;
}

Main.prototype.configuration = function() {
  return self._configuration;
}

Main.prototype.setconfiguration = function(fnOrValue) {
  self._configuration = fnOrValue;
}

Main.prototype.instructions = function() {
  return self._instructions;
}

Main.prototype.setinstructions = function(fnOrValue) {
  self._instructions = fnOrValue;
}

Main.prototype.proxies = function() {
  return self._proxies;
}

Main.prototype.setproxies = function(fnOrValue) {
  self._proxies = fnOrValue;
}

Main.prototype.resource = function() {
  return self._resource;
}

Main.prototype.setresource = function(fnOrValue) {
  self._resource = fnOrValue;
}

Main.prototype.execute = function() {  // a function that returns a promise
  console.log('mains main - execute called');
  var _Me = {}; // COME UP WITH SOMETHING ELSE THAN _Me
  var _promise = self._proxies.proxy().libraries().library().promise();
  var _join = _promise.join;
  return new _promise(function(resolve) {
    // Check the instructions and execute each one of them
    self._instructions.forEach(function(instruction) { 
      console.log('mains main - instruction: ', instruction); 
      for(var key in instruction){
		console.log('mains main instruction - key: ', key); // key
		console.log('mains main instruction - instruction[key]: ', instruction[key]); // key's value
	    switch(key) {
	      case 'start':
	        _join(self._start(),function(start) {
	          _Me.start = start;
	        }) // eof join
	        break;
	      case 'stop':
	        _join(self._stop(),function(stop) {
	          _Me.stop = stop;
	        }) // eof join
	        break;
	      default:
	        // do nothing
	    }; // eof switch
	  } // eof for
    }); // eof forEach

    resolve(_Me); // Note: return something

  }) // eof promise
  .catch(function(error) {
    console.log('mains main execute - error: ', error);
  }) // eof catch
  .finally(function() {
    console.log('mains main execute - finally');
  }); // eof finally
} // eof execute

Main.prototype.start = function() {  // a function that returns a promise
  console.log('mains main - start called');
  // start the resource
  var _promise = self._proxies.proxy().libraries().library().promise();
  //var join = promise.join;
  return new _promise(function(resolve) {

	  // Get the configurations for resource
	  console.log('mains main - start promise self._resource.URI: ', self._resource.URI);
//	  var configurationForUuid = {}; // REMOVE THIS AS WE ALREADY HAVE IT AS A PROPERTY self._configuration
	  // See also 
	  // https://medialize.github.io/URI.js/
	  // var uri = URI("urn:uuid:c5542ab6-3d96-403e-8e6b-b8bb52f48d9a?query=string");
	  // uri.protocol() == "urn";
	  // uri.path() == "uuid:c5542ab6-3d96-403e-8e6b-b8bb52f48d9a";
	  // uri.query() == "query=string";
	  // console.log('main - library: ', _proxies().proxy().libraries().library); // function () { return new LibrariesLibrary(); }
	  // console.log('main - _proxies().proxy().libraries().library(): ', _proxies().proxy().libraries().library());  // Library {}
	  // console.log('main - _proxies().proxy().libraries().library().uri: ', _proxies().proxy().libraries().library().uri); // function () { return new LibraryUri(); }
	  // console.log('main - _proxies().proxy().libraries().library().uri(): ', _proxies().proxy().libraries().library().uri());

	  //ORIGINAL var uri = new self.proxies().proxy().libraries().library().uri(resourceForUuid.URI);
      var uri = new self._proxies.proxy().libraries().library().uri(self._resource.URI);
	  console.log('mains main - start promise uri: ', uri);
	  var scheme = uri.scheme(); // get scheme from URI e.g. 'urn' or 'url';
	  console.log('mains main - start promise scheme: ', scheme);
	  var namespaceIdentifier = uri.heirpart().value.split(':')[0]; // get NID from uri e.g. 'uuid' or 'http'
	  console.log('mains main - start promise namespaceIdentifier: ', namespaceIdentifier);
	  var namespaceSpecificString = uri.heirpart().value.split(':')[1]; //get NSS from uri e.g. '6e8bc430-9c3a-11d9-9669-0800200c9a66'
	  console.log('mains main - start promise namespaceSpecificString: ', namespaceSpecificString);
	  switch(scheme) {
	  	case 'url:':
	      console.log('mains main - start promise scheme: ', scheme);
	  	  // handle url, for remote files
		  // TODO
		  break;
	    case 'urn:':
	      // handle urn, for local files
	 	  console.log('mains main - start promise scheme: ', scheme);
		  console.log('mains main - start promise uri.value: ', uri.value);
		  var uriParts = uri.value.split(':');
		  console.log('mains main - start promise uriParts: ', uriParts);
		  // Look for the occurence of 'uuid' in the array of uriParts
		  var uriUuidKeyIndex = uriParts.indexOf('uuid'); // returns the index if the found Object
		  console.log('mains main - start promise uriUuidKeyIndex: ', uriUuidKeyIndex);
		  if (uriUuidKeyIndex >= 0) {
		    var uuid = uriParts[uriUuidKeyIndex+1]; 
		    console.log('mains main - start promise uuid: ', uuid);
		    // Get a configuration, by comparing with the uuid
		    //console.log('server - configuration: ', _proxies().proxy().configurations().configuration); // function () { return new ConfigurationsConfiguration(); }
		    //console.log('server - _proxies().proxy()..configurations().configuration(): ', _proxies().proxy().configurations().configuration());  // Configuration {}
		    //console.log('server - _proxies().proxy().configurations().configuration()._6e8bc430_9c3a_11d9_9669_0800200c9a66: ', _proxies().proxy().configurations().configuration()._6e8bc430_9c3a_11d9_9669_0800200c9a66);
		    //console.log('server - _proxies().proxy().configurations().configuration()._6e8bc430_9c3a_11d9_9669_0800200c9a66(): ', _proxies().proxy().configurations().configuration()._6e8bc430_9c3a_11d9_9669_0800200c9a66());
		    var configuration = self._proxies.proxy().configurations().configuration();
		    console.log('mains main - start promise configuration: ', configuration);
		    for (var key in configuration) {
		      console.log('mains main - start promise key: ', key);
		      // Strip prefix _ if present on key, then substitute all _ for - if present on key
		      var keyUuid = key.replace(/^\_/, "").replace(/_/g, "\-");
		      console.log('mains main - start promise keyUuid: ', keyUuid);
		      if(uuid == keyUuid) {
		        console.log('mains main - start promise uuid == keyUuid');
		        // Do something
		        //ORIGINAL configurationForUuid = configuration[key]();
                self._setconfiguration(configuration[key]());
		        break;
		      }
		    } // eof for
		    //ORIGINAL console.log('main - configurationForUuid: ', configurationForUuid);
            console.log('mains main - start promise configuration: ', self._configuration);
		  } // eof if
		  else {
		  	// no uuid in resource.URI
		  }
	      break;
	    default:
	      // do nothing
	      break;
	  }//eof switch
	  // Validate configuration
	  if(Object.keys(self._configuration).length == 0) {
	    // Raise an error, the resource has not been found
	    throw new Error("No configuration found for uuid: ", uuid); // TO FIX: for some reason the value of uuid is empty here
	  } 
	//  else {
	//    return self._configuration;
	//  };

      // Check which properties are contained within self._configuration
	  var common = self._configuration.common();
	  console.log('mains main - self._configuration.common(): ', common);
	  // Data protection
	  // var private_host = self._configuration.common()._host; // This fails, var _host is private therefore hidden from direct access
	  // console.log('server - private_host: ', private_host);
	  // var public_host = self._configuration.common().host(); // This succeeds, the method host() is public, with access to the private var _host
	  // console.log('server - public_host: ', public_host);
	  var server_prefix = self._configuration.common().server_prefix() || 'PREFIX';
	  console.log('mains main - server_prefix: ', server_prefix);

	  var serversServer = self._configuration.servers().server();
	  console.log('mains main - servers().server(): ', serversServer);

	  var serversServerExpress = self._configuration.servers().server().express();
	  console.log('mains main - servers().server().express(): ', serversServerExpress);

	  var serversServerExpressHost = self._configuration.servers().server().express().host();
	  console.log('mains main - servers().server().express().host(): ', serversServerExpressHost); // undefined ?! FIX THIS !!

	  // Get the express library
	  var express = _proxies().proxy().libraries().library().express; // note: don't call express yet
	  console.log('mains main - express: ', express);
	  // Assign express to the server
	  var server = express(); // note: now call express
	  console.log('mains main - server: ', server);

	  var mappings = _proxies().proxy().mappings();
	  console.log('mains main - mappings: ', mappings);

	  var mapping = _proxies().proxy().mappings().mapping();
	  console.log('mains main - mapping: ', mapping);

	  var rethinkdbMapping = _proxies().proxy().mappings().mapping().rethinkdb; // note: don't call rethinkdb yet
	  console.log('mains main - rethinkdbMapping: ', rethinkdbMapping);

	  var config = self._configuration.databases().database().rethinkdb();
	  console.log('mains main - config: ', config);

	  console.log('mains main - config.rethinkdb(): ', config.rethinkdb()); // Expected empty Object
	  var rethinkdb = _proxies().proxy().databases().database().rethinkdb();
	  console.log('mains main - rethinkdb: ', rethinkdb);
	  config.setrethinkdb(rethinkdb); // Set rethinkdb to config
	  console.log('mains main - config.rethinkdb(): ', config.rethinkdb()); // Expected set to RethinkDB

	  console.log('mains main - config.event(): ', config.event()); // Expected empty Object
	  var event = _proxies().proxy().events().event();
	  config.setevent(event); // Set event to config
	  console.log('mains main - config.event(): ', config.event()); // Expected set to Event

	  console.log('mains main - config.error(): ', config.error()); // Expected empty Object
	  var error = _proxies().proxy().errors().error();
	  config.seterror(error); // Set error to config
	  console.log('mains main - config.error(): ', config.error()); // Expected set to Error

	  var promise = _proxies().proxy().libraries().library().promise;
	 
	  console.log('mains main - config.utility(): ', config.utility()); // Expected empty Object
	  var utility = _proxies().proxy().utilities().utility();
	  utility.setpromise(promise); // Don't call the promise yet, or should we?
	  utility.setevent(event);

	  // UNCOMMENT WHEN THIS ERROR IS FIXED!
	  //utility.inherits(error); // Utility needs to inherit all the error objects // Currently [TypeError: utility.inherits is not a function]

	  config.setutility(utility); // Set utility to config
	  console.log('mains main - config.utility(): ', config.utility()); // Expected set to Utility

	  console.log('mains main - config.schema(): ', config.schema()); // Expected empty Object 
	  var schema = _proxies().proxy().schemas().schema();
	  schema.seterror(error);
	  schema.setutility(utility);
	  schema.settype(type);
	  config.setschema(schema); // Set schema to config
	  console.log('mains main - config.schema(): ', config.schema()); // Expected set to Schema

	  console.log('mains main - config.type(): ', config.type()); // Expected empty Object 
	  var type = _proxies().proxy().types().type();
	  type.seterror(error);
	  type.setutility(utility);
	  type.setschema(schema);
	  var validator = _proxies().proxy().libraries().library().validator; // note: don't call validator yet
	  type.setvalidator(validator);
	  config.settype(type); // Set type to config
	  console.log('mains main - config.type(): ', config.type()); // Expected set to Type

	  var feed = _proxies().proxy().feeds().feed();
	  feed.setevent(event);
	  feed.setpromise(promise);
	  feed.setutility(utility);

	  console.log('mains main - config.query(): ', config.query()); // Expected empty Object
	  var query = _proxies().proxy().queries().query();
	  query.seterror(error);
	  query.setschema(schema);
	  query.setutility(utility);
	  query.setfeed = (feed);
	  query.setpromise = (promise);

	  console.log('mains main ------------- CHECK POINT  000 -------------'); // FOR TESTING ONLY !

	// WE ARE HERE ! 
	  query.setrethinkdb(rethinkdb); // Do this as last set; // Causes [TypeError: self._rethinkdb is not a function]
	  
	  console.log('mains main ------------- CHECK POINT  001 -------------'); // FOR TESTING ONLY !

	  config.setquery(query); // Set query to config
	  console.log('mains main - config.query(): ', config.query()); // Expected set to Query

	  // Make sure RethinkDB is running before executing the following instruction
	  // On Windows, run rethinkdb.exe
	  // On Linux, tbc
	  // On Mac, tbc
	  var rethinkdbMapping = rethinkdbMapping(config);




	//  var rethinkdb = rethinkdbMapping.r;
	//  console.log('mains main - rethinkdb: ', rethinkdb);




	//				            .then(function(_Me) {
	//				              return(
	//				              	join(_Me.proxies.mappings(), function(mappings) { 
	//				                  console.log('server - mappings: ', mappings);
	//				                  _Me.mappings = mappings; // mappings contains a mapping for rethinkdb
	//				                  return(_Me);
	//				                }) // eof join
	//					            .catch(function(error) {
	//				                  console.log('server - error: ', error);
	//				                }) // eof catch                
	//				              ); // eof return
	//				            }); // eof then mappings

					/*				
										// Import mappings
										//	var Mappings = require(__dirname+'/../mappings.js')('RethinkDB'); // here we specify that we want the 'rethinkdb' mapping
										//	console.log(server_prefix + ' - Mappings: ', Mappings);

											// handle mappings like configurations, as a function that returns a promise
						                    var mappings = require(path.join(paths.mappings, 'mappings.js')); // A function that returns a Promise
						                    var mapping = 'rethinkdb'; // here we specify that we want the 'rethinkdb' mapping
						                    mappings(mapping)
						                      .then(function(mappings) {

											    var server_prefix = configurations.common.server_prefix || 'PREFIX';
											    console.log(server_prefix + ' - mappings: ', mappings);
					*/

	//					                        console.log('++++++++++++++++++++++++++++ LOG POINT server 0 ++++++++++++++++++++++++++++');

					/*
											    // AMEND FROM BELOW HERE ....

						                        // Call RethinkDB mapping
												console.log(server_prefix + ' - configurations.databases.rethinkdb: ', configurations.databases.rethinkdb);

												// NOTE: 'thinky' is from here on 'Mapping'

						                        console.log('++++++++++++++++++++++++++++ LOG POINT server 1 ++++++++++++++++++++++++++++');


						                        // An error occurs here: 
						                        // Unhandled rejection TypeError: 
						                        // rethinkdb is not a function
						                        // at C:\Users\vanheemstraw\git\vanHeemstraSystems\mappings\rethinkdb.js:23:5

						                        // Check to see if the Mappings object is valid:
						                        console.log(server_prefix + ' - Mappings: ', Mappings);






												var Mapping = Mappings.mapping(configurations.databases.rethinkdb);// call the 'rethinkdb' mapping, providing it with the config for rethinkdb

						                        //FAILS BEFORE WE COME TO HERE: require(..) is not a function

												console.log(server_prefix + ' - Mapping: ', Mapping);

												console.log('++++++++++++++++++++++++++++ LOG POINT server 2 ++++++++++++++++++++++++++++');

												var r = Mapping.r;
												console.log(server_prefix + ' - r: ', r);

												var type = Mapping.type;
												console.log(server_prefix + ' - type: ', type);

												// Create the model
												//WAS var Todo = thinky.createModel("todos", {
												var Todo = Mapping.createModel("todos", {
												    id: type.string(),
												    title: type.string(),
												    completed: type.boolean(),
												    createdAt: type.date().default(r.now())
												});
												console.log(server_prefix + ' - Todo: ', Todo);

												// Ensure that an index createdAt exists
												Todo.ensureIndex("createdAt");

												server.use(_Me.proxies.libraries.express.static(__dirname + '/../publications'));
												//DEPRECATED server.use(bodyParser());
												server.use(_Me.proxies.libraries.bodyParser.urlencoded({
												  extended: true
												}));
												server.use(_Me.proxies.libraries.bodyParser.json());

												server.route('/todo/get').get(get);
												server.route('/todo/new').put(create);
												server.route('/todo/update').post(update);
												server.route('/todo/delete').post(del);

												// Retrieve all todos
												function get(req, res, next) {
												  console.log(server_prefix + ' - Get called');
												  Todo.orderBy({index: "createdAt"}).run().then(function(result) {
												    res.send(JSON.stringify(result));
												  }).error(handleError(res));
												}

												// Create a new todo
												function create(req, res, next) {
												  console.log(server_prefix + ' - Create called');
												  var todo = new Todo(req.body);
												  todo.save().then(function(result) {
												    res.send(JSON.stringify(result));
												  }).error(handleError(res));
												}

												// Update a todo
												function update(req, res, next) {
												  console.log(server_prefix + ' - Update called');
												  var todo = new Todo(req.body);
												  Todo.get(todo.id).update({
												    title: req.body.title,
												    completed: req.body.completed
												  }).run().then(function(todo) {
												    res.send(JSON.stringify(todo));
												  }).error(handleError(res));

												  // Another way to update a todo is with
												  // Todo.get(req.body.id).update(todo).execute()
												}

												// Delete a todo
												function del(req, res, next) {
												  console.log(server_prefix + ' - Delete called');
												  Todo.get(req.body.id).run().then(function(todo) {
												    todo.delete().then(function(result) {
												      res.send("");
												    }).error(handleError(res));
												  }).error(handleError(res));

												  // Another way to delete a todo is with
												  // Todo.get(req.body.id).delete().execute()
												}

												function handleError(res) {
												  console.log(server_prefix + ' - handleError called');
												  return function(error) {
												    return res.send(500, {error: error.message});
												  }
												}

												// Start express
												server.listen(configurations.servers.express.port);
												console.log(server_prefix + ' - listening on port '+configurations.servers.express.port);

						                      }); // eof mappings(mapping)
										  }); // eof configurations(resource)


						        //      }); // eof resources(uuid)

					*/






    resolve('foo'); // Note: return something
  }) // eof promise
  .catch(function(error) {
    console.log('mains main - start() error: ', error);
  }) // eof catch
  .finally(function() {
    console.log('mains main - start() finally');
  }); // eof finally
} // eof start

Main.prototype.stop = function() {  // a function that returns a promise
  console.log('mains main - stop called');
  // stop the resource
  var _promise = self._proxies.proxy().libraries().library().promise();
  //var join = promise.join;
  return new _promise(function(resolve) {

    // MORE

    resolve('foo'); // Note: return something
  }) // eof promise
  .catch(function(error) {
    console.log('mains main - stop() error: ', error);
  }) // eof catch
  .finally(function() {
    console.log('mains main - stop() finally');
  }); // eof finally
} // eof stop

module.exports = Main;
