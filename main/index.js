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
  self._proxies = {}; // will be set, before passing on to mapping
  self._resource = {}; // will be set, before passing on to mapping
  self.configuration = {};
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

Main.prototype.configuration = function() {
  return self._configuration;
}

Main.prototype.setconfiguration = function(fnOrValue) {
  self._configuration = fnOrValue;
}

Main.prototype.run = function() {  // a function that returns a promise
  console.log('main - run called');	
  // run the resource
  this.promise = self.proxies().proxy().libraries().library().promise;
  //var join = promise.join;
  return new this.promise(function(resolve) {

	  // Get the configurations for resource
	  console.log('main - self.resource().resource.URI: ', self.resource().URI);
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

	  var uri = new self.proxies().proxy().libraries().library().uri(resourceForUuid.URI);
	  console.log('main - uri: ', uri);
	  var scheme = uri.scheme(); // get scheme from URI e.g. 'urn' or 'url';
	  console.log('main - scheme: ', scheme);
	  var namespaceIdentifier = uri.heirpart().value.split(':')[0]; // get NID from uri e.g. 'uuid' or 'http'
	  console.log('main - namespaceIdentifier: ', namespaceIdentifier);
	  var namespaceSpecificString = uri.heirpart().value.split(':')[1]; //get NSS from uri e.g. '6e8bc430-9c3a-11d9-9669-0800200c9a66'
	  console.log('main - namespaceSpecificString: ', namespaceSpecificString);
	  switch(scheme) {
	  	case 'url:':
	      console.log('main - scheme: ', scheme);
	  	  // handle url, for remote files
		  // TODO
		  break;
	    case 'urn:':
	      // handle urn, for local files
	 	  console.log('main - scheme: ', scheme);
		  console.log('main - uri.value: ', uri.value);
		  var uriParts = uri.value.split(':');
		  console.log('main - uriParts: ', uriParts);
		  // Look for the occurence of 'uuid' in the array of uriParts
		  var uriUuidKeyIndex = uriParts.indexOf('uuid'); // returns the index if the found Object
		  console.log('main - uriUuidKeyIndex: ', uriUuidKeyIndex);
		  if (uriUuidKeyIndex >= 0) {
		    var uuid = uriParts[uriUuidKeyIndex+1]; 
		    console.log('main - uuid: ', uuid);
		    // Get a configuration, by comparing with the uuid
		    //console.log('server - configuration: ', _proxies().proxy().configurations().configuration); // function () { return new ConfigurationsConfiguration(); }
		    //console.log('server - _proxies().proxy()..configurations().configuration(): ', _proxies().proxy().configurations().configuration());  // Configuration {}
		    //console.log('server - _proxies().proxy().configurations().configuration()._6e8bc430_9c3a_11d9_9669_0800200c9a66: ', _proxies().proxy().configurations().configuration()._6e8bc430_9c3a_11d9_9669_0800200c9a66);
		    //console.log('server - _proxies().proxy().configurations().configuration()._6e8bc430_9c3a_11d9_9669_0800200c9a66(): ', _proxies().proxy().configurations().configuration()._6e8bc430_9c3a_11d9_9669_0800200c9a66());
		    var configuration = self.proxies().proxy().configurations().configuration();
		    console.log('main - configuration: ', configuration);
		    for (var key in configuration) {
		      console.log('main - key: ', key);
		      // Strip prefix _ if present on key, then substitute all _ for - if present on key
		      var keyUuid = key.replace(/^\_/, "").replace(/_/g, "\-");
		      console.log('main - keyUuid: ', keyUuid);
		      if(uuid == keyUuid) {
		        console.log('main - uuid == keyUuid');
		        // Do something
		        //ORIGINAL configurationForUuid = configuration[key]();
                self.setconfiguration(configuration[key]());
		        break;
		      }
		    } // eof for
		    //ORIGINAL console.log('main - configurationForUuid: ', configurationForUuid);
            console.log('main - configuration: ', self.configuration());
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
	  if(Object.keys(self.configuration()).length == 0) {
	    // Raise an error, the resource has not been found
	    throw new Error("No configuration found for uuid: ", uuid); // TO FIX: for some reason the value of uuid is empty here
	  } 
	//  else {
	//    return configurationForUuid;
	//  };


    console.log('main - +++++++++++++++++++++++++++ CHECK POINT 0001 ++++++++++++++++++++++++++');



    resolve(foo); // Note: return something
  }) // eof promise
  .catch(function(error) {
    console.log('main - error: ', error);
  }) // eof catch
  .finally(function() {
    console.log('main - finally');
  }); // eof finally
}

module.exports = Main;
