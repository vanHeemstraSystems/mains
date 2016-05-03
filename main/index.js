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

Main.prototype.run = function() {
  // run the resource



  // Get the configurations for resourceForUuid
  console.log('main - resource.URI: ', self.resource().URI);
  var configurationForUuid = {}; // REMOVE THIS AS WE ALREADY HAVE IT AS A PROPERTY self._configuration
  // See also 
  // https://medialize.github.io/URI.js/
  // var uri = URI("urn:uuid:c5542ab6-3d96-403e-8e6b-b8bb52f48d9a?query=string");
  // uri.protocol() == "urn";
  // uri.path() == "uuid:c5542ab6-3d96-403e-8e6b-b8bb52f48d9a";
  // uri.query() == "query=string";
  // console.log('server - library: ', _proxies().proxy().libraries().library); // function () { return new LibrariesLibrary(); }
  // console.log('server - _proxies().proxy().libraries().library(): ', _proxies().proxy().libraries().library());  // Library {}
  // console.log('server - _proxies().proxy().libraries().library().uri: ', _proxies().proxy().libraries().library().uri); // function () { return new LibraryUri(); }
  // console.log('server - _proxies().proxy().libraries().library().uri(): ', _proxies().proxy().libraries().library().uri());

  var uri = new _proxies().proxy().libraries().library().uri(resourceForUuid.URI);
  console.log('server - uri: ', uri);
  var scheme = uri.scheme(); // get scheme from URI e.g. 'urn' or 'url';
  console.log('server - scheme: ', scheme);
  var namespaceIdentifier = uri.heirpart().value.split(':')[0]; // get NID from uri e.g. 'uuid' or 'http'
  console.log('server - namespaceIdentifier: ', namespaceIdentifier);
  var namespaceSpecificString = uri.heirpart().value.split(':')[1]; //get NSS from uri e.g. '6e8bc430-9c3a-11d9-9669-0800200c9a66'
  console.log('server - namespaceSpecificString: ', namespaceSpecificString);
  switch(scheme) {
  	case 'url:':
      console.log('server - scheme: ', scheme);
  	  // handle url, for remote files
	  // TODO
	  break;
    case 'urn:':
      // handle urn, for local files
 	  console.log('server - scheme: ', scheme);
	  console.log('server - uri.value: ', uri.value);
	  var uriParts = uri.value.split(':');
	  console.log('server - uriParts: ', uriParts);
	  // Look for the occurence of 'uuid' in the array of uriParts
	  var uriUuidKeyIndex = uriParts.indexOf('uuid'); // returns the index if the found Object
	  console.log('server - uriUuidKeyIndex: ', uriUuidKeyIndex);
	  if (uriUuidKeyIndex >= 0) {
	    var uuid = uriParts[uriUuidKeyIndex+1]; 
	    console.log('server - uuid: ', uuid);
	    // Get a configuration, by comparing with the uuid
	    //console.log('server - configuration: ', _proxies().proxy().configurations().configuration); // function () { return new ConfigurationsConfiguration(); }
	    //console.log('server - _proxies().proxy()..configurations().configuration(): ', _proxies().proxy().configurations().configuration());  // Configuration {}
	    //console.log('server - _proxies().proxy().configurations().configuration()._6e8bc430_9c3a_11d9_9669_0800200c9a66: ', _proxies().proxy().configurations().configuration()._6e8bc430_9c3a_11d9_9669_0800200c9a66);
	    //console.log('server - _proxies().proxy().configurations().configuration()._6e8bc430_9c3a_11d9_9669_0800200c9a66(): ', _proxies().proxy().configurations().configuration()._6e8bc430_9c3a_11d9_9669_0800200c9a66());
	    var configuration = _proxies().proxy().configurations().configuration();
	    console.log('server - configuration: ', configuration);
	    for (var key in configuration) {
	      console.log('server - key: ', key);
	      // Strip prefix _ if present on key, then substitute all _ for - if present on key
	      var keyUuid = key.replace(/^\_/, "").replace(/_/g, "\-");
	      console.log('server - keyUuid: ', keyUuid);
	      if(uuid == keyUuid) {
	        console.log('server - uuid == keyUuid');
	        // Do something
	        configurationForUuid = configuration[key]();
	        break;
	      }
	    } // eof for
	    console.log('server - configurationForUuid: ', configurationForUuid);
	  } // eof if
	  else {
	  	// no uuid in resourceForUuid.URI
	  }
      break;
    default:
      // do nothing
      break;
  }//eof switch
  // Validate configurationForUuid
  if(Object.keys(configurationForUuid).length == 0) {
    // Raise an error, the resourceForUuid has not been found
    throw new Error("No configuration found for uuid: ", uuid); // TO FIX: for some reason the value of uuid is empty here
  } 
  else {
    return configurationForUuid;
  };




}

module.exports = Main;
