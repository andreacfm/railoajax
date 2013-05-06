/**
 *@module Railo
 *@class Railo
 */

var Railo = (function(){


/**
 *Private - Railo.Bind.jsBindHandler
 *@property _RAILO_JS_BIND_HANDLER
 *@type String
 */
var _RAILO_JS_BIND_HANDLER = 'Railo.Bind.jsBindHandler';

/**
 *Private - Railo.Bind.cfcBindHandler
 *@property _RAILO_CFC_BIND_HANDLER
 *@type String
 */

var _RAILO_CFC_BIND_HANDLER = 'Railo.Bind.cfcBindHandler';

/**
 *Private - Railo.Bind.urlBindHandler
 *@property _RAILO_URL_BIND_HANDLER
 *@type String
 */

var _RAILO_URL_BIND_HANDLER = 'Railo.Bind.urlBindHandler';

/**
 *Private - ['json','plain','wddx']
 *@property _RAILO_CFC_RETURN_FORMATS
 *@type Array
 */
var _RAILO_CFC_RETURN_FORMATS = ['json','plain','wddx'];

/**
 * Private - 1.4.2
 * @property _JQUERY_VERSION
 * @type String
 */
var _JQUERY_VERSION = '1.4.2';


return {


/**
 * Initialize the Railo JS environment.
 * Register the internal 'onLoad' event and dispatch it on Window 'onLoad' Event.
 * @base Railo
 */
init: function(){
	/*
	 * Internal onLoad event that rely on global window.onLoad.
	 */
	Railo.Events.registerEvent('onLoad');

	window.onload = function(){
		Railo.Events.dispatchEvent('onLoad');
	}

},


/**
 * Static Constants on demand. Es: Railo.config('_RAILO_JS_BIND_HANDLER');
 * @return {String} config
 */
config: function(a){
	return eval(a);
},


/**
 * General Error Handler.
 * @param {String} err Error message class name.
 * @param {Object} data Literal Object that contains the values to be replaced into the the template message.
 */
globalErrorHandler : function(err,data){
	err = err.split('.');
	var context = Railo.Message[err[0]];
	var msg = context[err[1]];
	var t = Railo.Util.template(msg,data);
	alert(t);
},


/**
 * Public loadedResources
 * @property loadedResources
 * @type Array
 */
loadedResources : []

}
})();



/**
 * Messages are filtered by Railo.Util.template. Used by global error handler to
 * produce useful alerts.
 * {0} = replaced by the element with index 0 of the array passed to 'template' function
 * @base Railo
 * @class Message
 */
Railo.Message = {

	ajax :{
		tagDoNotExists : 'The tag {0} is not supported.',
		parameterMissing : 'Function {0}. The [{1}] parameter is required but was not passed.',
		missingDomElement : 'Function {0}. The dom element [{1}] do not exists.',
		targetMissing : 'Function {0}. Target element [{1}] do not exists',
		librayNotSupported : 'Library {0} is not supported in this context',
		providerNotSupported : 'Data Provider {0} is not supported in this context'
	},

	window : {
		windowNotFound : 'The Window with name {0} has not been found!',
		windowAlreadyExists : 'The Window with name {0} already exists!'
	},

	layout : {
		LayoutNotFound : 'The Layout with name {0} has not been found!',
		LayoutHasNoChildren : 'The Layout with name {0} has no layoutareas!'
	}

};



/**
 * Railo.adapters
 */
Railo.adapters = {};


/**
 * Railo.Events
 */
Railo.Events =  (function(){

/**
 * Events repository
 */
var _e = {};



/**
 * P
 * @private
 * @return void
 * @alias publisher
 * @hint Class that represent any registered event.Internally register subscribers and call them on events firing.
 */
var _P = function(){
	var s = [];
	this.subscribe = function(obj){
		for (var i=0; i < s.length ; i ++){
			if ( s[i] === obj ) {
			    return;
			 }
		}
		s.push(obj);
	}
	this.deliver = function(ev) {
		/* only the data field is passed to the listeners to have better performance*/
		for (var i=0 ; i < s.length ; i ++ ){
			s[i](ev.data);
		}
		var c = ev.callback;
		if(typeof(c) == 'function'){
			c(ev);
		}
		return this;
	}

};



/**
 * @private
 * @param {string} n
 * @param {Object} d
 * @param {Function} c ( not used in Railo Implementation )
 */
var _Event = function(n,d,c){
	this.name = n;
	this.data = d;
	this.callback = c;
};


return{


/**
 * registerEvent
 * Add a new event to the events engine.
 * If an event has already been loaded request is skipped. NAME MATTER!!!!!!!!!!!!!!!!!
 *
 * @return void
 * @param {String} name
 */
registerEvent : function(name){
	if(!_e[name]){
		_e[name] = new _P();
	}
},



/**
 * PUBLIC removeEvent
 * remove an event from the engine.
 *
 * @return void
 * @param {String} name
 */
removeEvent : function(name){
	_e[name];
},



/**
 * subscribe
 * @return void
 * @param {Object} o
 * @param {String} ev
 * @hint An obj subscribe to listen to the required event. Event are matched by name.
 */
subscribe : function(o,ev){
	if(!_e[ev]){
		throw('Event ' + ev + ' do not exists!');
	}
	var p = _e[ev];
	p.subscribe(o);
},



/**
 * dispatchEvent
 * @return void
 * @param {Object} ev
 * @hint Dispatch an event. If a string ( in place of the event object ) is passed an event obejct
 * is generated before calling the deliver method.
 */

dispatchEvent : function(ev,d,c){
	if(typeof(ev) == 'string'){
		ev = this.newEvent(ev,d,c);
	}
	var publisher = _e[ev.name];
	publisher.deliver(ev);

},



/**
 * @return {Array}
 * @return {Object}
 * @hint Return the events repository object
 */
getEvents : function(){
	return _e;
},



/**
 * @param {string} name
 * @param {Object} data
 * @param {Object} callback
 * @return {Object}
 * @hint Generate a new event object
 */
newEvent : function(n,d,c){
	return new _Event(n,d,c);
}

}
})();




/*********************************************************************
 * SYSTEM EVENTS
 * Library register and expose system events.
 *********************************************************************/
/*
 * Triggered from import resources script.
 * Customize the depency config object lietening to this event.
 */
Railo.Events.registerEvent('Railo.beforeDoImport');

/* register events*/
Railo.Events.registerEvent('Railo.AfterInnerHtml');




/*******************************************************************************
 * Railo.XHR
 *******************************************************************************/

/**
 * @constructor
 */
Railo.XHR = function() {};


Railo.XHR.prototype = {

/**
 * Perform the asynch calls
 * @param {Object} opt
 */
request: function(opt){

	/* required */
	if(!opt.url){throw('Url is required!');}else{url=opt.url}

	/* defaults */
	var type = opt.type ? opt.type : 'GET';
	var async = true;
	if(!opt.async){async = false;}
	var success = opt.success ? opt.success : null;
	var beforeSend = opt.beforeSend ? opt.beforeSend : null;
	var error = opt.error ? opt.error : null;
	var dataType = opt.dataType ? opt.dataType : 'json';
	var data = opt.data ? opt.data : {};

	var x = this.createXhrObject();

	/* query string */
	var qs = "";

	if(data){
        var counter = 1;
		for(key in data){
            var param = key + '=' + data[key];
            if(counter > 1){
                param = '&' + param;
            }
            qs  = qs + param;
            counter ++;
		}
	}

	/*add a random string for forcing browser to call again */
	if(!opt.cache){
		var rand_no = Math.ceil(Math.random()*1000000000);
		qs = qs + '&_' + rand_no;
	}

	if(type.match(/get/i) && (qs)){
        if(url.match(/[\?]/) && !url.match(/[\?]$/)){
            url = url + '&';
        }else if(!url.match(/[\?]/) && qs.length > 0){
            url = url + '?';
        }
		url = url + qs;
	}

	x.onreadystatechange = function() {

	    if(x.readyState !== 4) return;

		if(x.status == 200){
			var data = x.responseText;
			/*
			 * Parse as JSON if required.
			 * By default just clean the response and treat it like a string.
			 */
			if(dataType == 'json'){
				data = Railo.Json.decode(data);
			}else{
				data = data.replace(/\r\n/g, "");
			}

			/*
			 * If exist a success callback call it.
			 */
			if(typeof(success) == 'function'){
				success(data,x.statusText);
			}

		}else{

			if(error){
				error(x,x.status,x.statusText);
			}
		}

	};

	x.open(type, url, async);

	if(type.match(/post/i)){
		/* this declare call as a post */
		x.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	}else{
		/* if no post be sure qs is null*/
		qs = null;
	}

	if((typeof(beforeSend) == 'function')){
		beforeSend(x);
	}

	x.send(qs);

	return x;
},

/**
 * @classDescription XHR factory
 * @return {XHR}
 */
createXhrObject: function() {
	var methods = [
		function() { return new XMLHttpRequest(); },
  		function() { return new ActiveXObject('Msxml2.XMLHTTP'); },
  		function() { return new ActiveXObject('Microsoft.XMLHTTP'); }
	];

	for(var i = 0, len = methods.length; i < len; i++) {
  		try {
    		methods[i]();
  		}
  		catch(e){
    		continue;
  		}

		this.createXhrObject = methods[i];

  		return methods[i]();
	}

	throw new Error('XHR: Could not create an XHR object.');

}
};




/*********************************************************************************************
 * Railo.Ajax
 *********************************************************************************************/

Railo.Ajax = (function(){

	/*
	 * xhr instance. Just one for all the needs.
	 */
	var xhr = new Railo.XHR();


/**
 * TAG CONFIGS
 * Any time function doImport run for a specific tag use this configuration for :
 * 1) Load necessary js resources.
 * 2) Register events that will be dispatched by the TAG concrete implementation.
 *
 * The whole object is passed as argument by Railo.beforeDoImport event and can be customized as needed
 */
var config = {
	"CFAJAXPROXY" : {
		js : [],
		events : []
	},
	"CFDIV"     : {
		js : [],
		events : []
	},
	"CFMAP"		: {
		provider: {
			'google' : ['http://maps.google.com/maps?file=api&v=2&key={_cf_params.GOOGLEMAPKEY}&sensor=false','google/google-map']
		},
		js : ['RailoMap'],
		events :[]
	},
	"CFWINDOW" : {
		libs : {
			'jquery' : ['jquery/jquery-1.8.3','jquery/jquery-ui-1.8.2','jquery/jquery.window'],
			'ext' : ['ext/ext-base','ext/ext-all','ext/ext.window']
		},
		js : ['RailoWindow'],
		events : [
				'Window.beforeCreate',
				'Window.afterCreate',
				'Window.beforeShow',
				'Window.afterShow',
				'Window.beforeHide',
				'Window.afterHide',
				'Window.beforeClose',
				'Window.afterClose']
	},
	"CFLAYOUT-TAB" : {
		libs : {
			'jquery' : ['jquery/jquery-1.8.3','jquery/jquery-ui-1.8.2','jquery/jquery.layout'],
			'ext' : ['ext/ext-base','ext/ext-all','ext/ext.layout']
		},
		js : ['RailoLayout'],
		events : [
			'Layout.afterTabSelect',
			'Layout.beforeTabInit',
			'Layout.afterTabInit',
			'Layout.beforeTabCreate',
			'Layout.afterTabCreate',
			'Layout.beforeTabRemove',
			'Layout.afterTabRemove',
			'Layout.beforeTabSelect',
			'Layout.afterTabSelect',
			'Layout.beforeTabDisable',
			'Layout.afterTabDisable',
			'Layout.beforeTabEnable',
			'Layout.afterTabEnable'
			]
	}
};



/**
 * CSS CONFIGS
 * Tag that need to load css resources
 * and config of the resources location.
 */
var cssConfigs = {

		"CFWINDOW" : {
			'jquery' : ['jquery/RailoSkin'],
			'ext' : ['ext/css/RailoSkin']
		},

		"CFLAYOUT-TAB" : {
			'jquery' : ['jquery/RailoSkin'],
			'ext' : ['ext/css/RailoSkin']
		}

};



/**
 * @return {Boolean}
 * @param {Object} f
 * @classDescription Verify that the returnFormat is supported.
 */
function isValidReturnFormat(f){
	var v = false;
	var c = Railo.config('_RAILO_CFC_RETURN_FORMATS');
	for(var i=0; i < c.length; i++){
		if(c[i] == f){
			v = true;
			break;
		}
	}
	return v;
}



/**
 * @classDescription Verify if an external resource has already been loaded.
 * @param {String} library
 * @return {Boolean}
 */
function isLibLoaded(lib){
	var result = false;
	for(var i=0; i < Railo.loadedResources.length; i++){
		if(Railo.loadedResources[i] == lib){
			return true;
		}
	}
}

/**
 * Load any dependency needed by a specific tag and register the events that the concrete tag
 * implementation will dispatch.
 * Use config object.
 *
 * @param {String} name Tag name to be imported
 * @return void
 */
function doImport(name,lib,provider,src){

	if(!config[name]){
		Railo.globalErrorHandler('ajax.tagDoNotExists',[name]);
	}

	/* jquery is the default library */
	if(!lib){lib = 'jquery';}

	if(_cf_params.jslib){lib = _cf_params.jslib;}

	if(!provider){provider = null;}

	/*if an src is provided use that*/
	src = src != undefined ? src : _cf_ajaxscriptsrc;

	var ev = Railo.Events.newEvent('Railo.beforeDoImport',config);
	Railo.Events.dispatchEvent(ev);

	/*
	 * Register Events if any.
	 * To be loaded events must be defined in the config object.
	 * {TAG}.{'events'}.[events]
	 */
	if(config[name].events){
		for(var i=0; i < config[name].events.length; i++){
			Railo.Events.registerEvent(config[name]['events'][i]);
		}
	}

	/*
	 * If the tag has a lib node:
	 * Check that lib is supported and then load resources.
	 */
	if(config[name].libs){
		if(typeof(config[name]['libs'][lib]) == 'undefined'){
			Railo.globalErrorHandler('ajax.librayNotSupported',[lib]);
		}


		// if object already exists skip the library loading
		var i = 0;
		if(lib == 'jquery'){
			if(typeof(jQuery) != 'undefined' && typeof(jQuery.fn.jquery) != 'undefined' && jQuery.fn.jquery == Railo.config('_JQUERY_VERSION')){
				i = 1;
			}
		}

		for(i; i < config[name]['libs'][lib].length; i++){
			if(!isLibLoaded(config[name]['libs'][lib][i])){
				document.write('<script type="text/javascript" src="' + _cf_ajaxscriptsrc + config[name]['libs'][lib][i] + '"><\/script>');
				Railo.loadedResources.push(config[name]['libs'][lib][i]);
			}
		}
	}

	/*
	 * Load css resources if needed.
	 */
	if(cssConfigs[name]){
		for(i=0; i < cssConfigs[name][lib].length; i++){
			if(!isLibLoaded(cssConfigs[name][lib][i])){
				document.write('<link rel="stylesheet" type="text/css" href="' + _cf_ajaxcsssrc + cssConfigs[name][lib][i] + '.css.cfm"/>');
			}
		}
		Railo.loadedResources.push(cssConfigs[name][lib][i]);
	}

	/*
	 * If the tag has a provider load that.
	 */
	if(config[name].provider){
		if(typeof(config[name]['provider'][provider]) == 'undefined'){
			Railo.globalErrorHandler('ajax.providerNotSupported',[provider]);
		}
		for(var i=0; i < config[name]['provider'][provider].length; i++){
			if(!isLibLoaded(config[name]['provider'][provider][i])){
				var str = config[name]['provider'][provider][i];
				var regex = new RegExp('\{.*\}','g');
				var match = str.match(regex);
				if(match){
					str = str.replace(match[0],eval(match[0].replace("\"|\{|\}","")));
				}
				if(Railo.Util.isUrl(str)){
					document.write('<script type="text/javascript" src="' +  str + '"><\/script>');
				}else{
					document.write('<script type="text/javascript" src="' + src + config[name]['provider'][provider][i] + '"><\/script>');
				}
				Railo.loadedResources.push(config[name]['provider'][provider][i]);
			}
		}
	}

	/*
	 * Load js resources as per config object in
	 * {TAG}.{'js'}.[filenames with mime extension]
	 */
	for(var i=0; i < config[name].js.length; i++){
		if(!isLibLoaded(config[name]['js'][i])){
			document.write('<script type="text/javascript" src="' + src + config[name]['js'][i] + '"><\/script>');
			/* lib is now loaded so will not be added again*/
			Railo.loadedResources.push(config[name]['js'][i]);
		}
	}
}


return{


/**
 * @classDescription Exposed interface to load tag dependencies.
 * @param {String} name
 * @return void
 */
importTag : function(name,lib,provider,src){
	doImport(name,lib,provider,src);
},



/**
 * @hint Internal Callback for perform self innerHtml.
 * By default is invoked anytime exists a bintTo parameter
 * @param {String} d data
 * @param {String} t text
 * @param {Object} b bindObject
 */
innerHtml : function(d,t,b){
	document.getElementById(b.bindTo).innerHTML = d;
	/* dispatch an event to advise that html has been dropped in the passed id element*/
	Railo.Events.dispatchEvent('Railo.AfterInnerHtml',b.bindTo);
},



/**
 * @hint Show the Loader item as per variable _cf_loadingtexthtml.
 * An hide method do not exists cause loader is displayed in the same area where
 * result will be inserted overwriting it.
 * @param {id} Id of the dom element where loader will be injected.
 * @return void
 */
showLoader : function(id){
	document.getElementById(id).innerHTML = _cf_loadingtexthtml;
},



/**
 * Global ajax error handler.
 * Filter error and call error callback.
 * @param {Array} data [
 * 		  XmlHttpRequest object,
 * 		  Error text from jquery ajax object,
 *        Bind object (or any object that contain an errorHandler item to be fired if provided)]
 * @return void
 */
exceptionHandler : function(data){
	var xhr = data[0];
	var status = data[1];
	var bind = data[2];
	/*
	 * The Custom error handler is provided receive:
	 * - Error Status code
	 * - Error message text
	 * - The object passed from Railo.Bind Handler or by Railo.AjaxProxy ( bind object or Ajax configs ).
	 */
	if(typeof(bind.errorHandler) == 'function'){
		bind.errorHandler(xhr.status,xhr.statusText,bind);
	}else{
		/*
		 * If no custom handler exists go on with built in handlers filters.
		 */
		if(xhr.status != 200){
			alert(xhr.status + ' - ' + xhr.statusText);
		}else if(status == 'parsererror'){
			alert('Server response is not a valid Json String!');
		}else{
			alert('An unknown error occurred during the ajax call!');
		}
	}
},


	/*
		 * @hint Filter arguments and normalize them before the request method invocation.
		 * @param {Object} o Object with the $.ajax candidate set up.
		 */
		call : function(o){
			// required
			if(!o.url){throw('Url argument is missing.')};
			// not required
			o.type = o.httpMethod || 'GET';
			o.returnFormat = o.returnFormat || 'json';
			if(o.async == 'undefined'){o.async = true;}
			o.success = o.callbackHandler || null;
			o.error = o.errorHandler || null;
			o.beforeSend = o.beforeSend || null;
			o.data = o.data || {};
			o.dataType = 'json';
			o.cache = false;
			if(o.returnFormat == 'plain'){
				o.dataType = 'html';
			}
		    // if cfc handler
			if(o.argumentCollection){
				// validate the returnFormat value
				if(!isValidReturnFormat(o.returnFormat)){
					throw('ReturnFormat ' + o.returnFormat + ' is not valid. Valid values are: ' + _RAILO_CFC_RETURN_FORMATS.join(','));
				}
				if(!o.method){throw('Method argument is missing.')};
				o.data = {
					method : o.method,
					returnFormat : o.returnFormat,
					argumentCollection : Railo.Json.encode(o.argumentCollection)
				}
				if(o.queryFormat){
					o.data.queryFormat = o.queryFormat;
				}
			}
			return xhr.request(o);
		},

/*************************************************************************************************
 * PUBLIC submitForm
 *
 * @param {String} R formId
 * @param {String} R url
 * @param {Function} callbackhandler
 * @param {Function} errorhandler
 * @param {String} httpMethod  Default 'POST'
 * @param {Sgtring} asynch
 * @param {Function} beforeSend
 * @param {String} returnFormat Default 'plain'
  *************************************************************************************************/
		submitForm : function(formId,url,callbackhandler,errorhandler,httpMethod,asynch,returnFormat,beforeSend){
			var c = {};
			if(!formId){
				Railo.globalErrorHandler('ajax.parameterMissing',['submitForm','formId']);
				return;
			}
			if(!url){
				Railo.globalErrorHandler('ajax.urlIsRequired',['submitForm','url']);
				return;
			}else{
				c.url = url;
			}

			c.success = callbackhandler || null;
			c.error = errorhandler || null;
			c.beforeSend = beforeSend || null;
			c.type = httpMethod || 'POST';
			c.dataType = returnFormat || 'plain';
			if(asynch == null){c.async = true}else{c.async = asynch};

			var form = document.getElementById(formId);
			if(!form){
				Railo.globalErrorHandler('ajax.missingDomElement',['submitForm',formId]);
				return;
			}

			c.data = Railo.Form.serialize(formId);

			xhr.request(c);
		},

/**
 * Prepare a form to be submitted via ajax.
 * @param {String} formId
 * @param {String} target
 * @param {Function} callbackhandler
 * @param {Function} errorhandler
 * @param {String} returnFormat
 * @param {Function} beforeSend
 */
		ajaxForm : function(formId,target,callbackhandler,errorhandler,returnFormat,beforeSend){

			var c = {};

			if(!formId){
				Railo.globalErrorHandler('ajax.parameterMissing',['ajaxSubmit','formId']);
				return;
			}

			if(target){
				var targetEl = document.getElementById(target);
				if(!targetEl){
					Railo.globalErrorHandler('ajax.targetMissing',['ajaxSubmit',target]);
					return;
				}
			}

			var form = document.getElementById(formId);

			// not required   \
			c.type = form.method || 'POST';
			c.url = form.action;
			c.success = callbackhandler || null;
			c.error = errorhandler || null;
			c.beforeSend = beforeSend || null;
			c.dataType = returnFormat || 'plain';

			if(target){
				c.success = function(data,textStatus){
					var b = {bindTo : target};
					Railo.Ajax.innerHtml(data,textStatus,b);
				}
			}

			Railo.Util.addEvent(form,'submit',function(e){
				if(e.preventDefault){
					e.preventDefault()
				}else{
					e.returnValue = false;
				};
			 	c.data = Railo.Form.serialize(formId);
				xhr.request(c);
				return false;
			 })
		},

/**
 * Passing the name ( or id for cfdiv ) used in the configuration trigger the underlined bind.
 * @param {Object} id
 */
		refresh : function(id){
			Railo.Events.dispatchEvent(id,Railo.Bind.getBind(id));
		}

	}
})();


/*
 * @classDescription Object proxy maker
 */
Railo.ajaxProxy = {};

/*
 * @param {String} cfcPath relative path to the proxied cfc
 * @param {String} jsClass name of the js variable that will incapsulate the proxy object
 */
Railo.ajaxProxy.init = function(a,b){

	/*
	 * Empty object represent the Railo.ajaxProxy instance and is returned.
	 * Main purpose is that it will craete a prototype that will be extended by any proxy object instance.
	 */
	var obj = function(){};
	/*
	 * Error event
	 */
	var errorEvent = b + '_errorEvent';

	/*
	 * Proxy Class to make instance of
	 */
	window[b] = function(){

		this.cfcPath = a;
		this.async = true;
		this.httpMethod = 'GET';
		this.errorHandler;
		this.callbackHandler;
		this.returnFormat = 'json';
		this.formId;
		this.queryFormat;
		this.errorEvent = errorEvent;

		this.setHTTPMethod = function(h){
			this.httpMethod = h;
		}
		this.setErrorHandler = function(e){
			this.errorHandler = e;
		}
		this.setCallbackHandler = function(c){
			this.callbackHandler = c;
		}
		this.setReturnFormat = function(r){
			this.returnFormat = r;
		}
		this.setAsyncMode = function(){
			this.async = true;
		}
		this.setSyncMode = function(){
			this.async = false;
		}
		this.setForm = function(id){
			this.formId = id;
		}
		this.setQueryFormat = function(q){
			this.queryFormat = q;
		}
	}
	/*
	 * Set the prototype chain
	 */
	window[b].prototype = new obj();

	/*
	 * create the error event
	 */
	Railo.Events.registerEvent(errorEvent);
	Railo.Events.subscribe(Railo.Ajax.exceptionHandler,errorEvent);

	return obj;

};

/************************************************************************************************************
 * invokeMethod
 *
 * @param {Object} obj Proxy object instance calling the method
 * @param {String} method Method to call on the cfc
 * @param {Object} args Arguments to be passed as argumentCollection
 ************************************************************************************************************/
Railo.ajaxProxy.invokeMethod = function(o,m,a){
	/*
	 * Analize the arguments passed.
	 * - If arguments are passed as a structure we need to analyze that
	 * and normalize back to a single plain literal object.
	 * In case both arguments are passed :  method(arg1:a,arg2:{arg1:b}) the argument in the struct will
	 * overwrite a same name argument in the lower stack.
	 */
	var arg = {};
	for(var k in a){
		if(typeof(a[k]) == 'object'){
			for(var k2 in a[k]){
				arg[k2] = a[k][k2];
			}
		}else{
			if (a[k]) {
				arg[k] = a[k];
			}
		}
	}
	/*
	 *  If a form id exists all fields are serialized into a literal object then reversed into the arguments obejct.
	 */
	if(o.formId){
		var f = Railo.Form.serialize(o.formId);
		for(key in f){
			arg[key] = f[key];
		}
	}

	var c = {
		url : o.cfcPath,
		method : m,
		argumentCollection : arg,
		httpMethod:o.httpMethod,
		returnFormat : o.returnFormat,
		async : o.async,
		queryFormat : o.queryFormat
	};
	if(o.callbackHandler){
		c.callbackHandler = o.callbackHandler;
	}
	/*
	 * If exists a defined error handler make it a callback of the global ajax error event..
	 */
	if(!o.errorHandler){
		o.errorHandler;
	}
	c.errorHandler = function(x,y,z){
		var ev = Railo.Events.newEvent(o.errorEvent,[x,y,o]);
		Railo.Events.dispatchEvent(o.errorEvent,[x,y,o]);
	}
	/*
	 *  If we need to return the value syncronize it.
	 *  Adobe compatibility. ONLY IF NO CALLBACKHANDLER
	 */
	if(!c.callbackHandler){
		c.async = false;
	}
	var r = Railo.Ajax.call(c);

	/*
	 * Return result only if call is sync
	 * We need extra parsing cause XHR parse result before passing it to the success callback but
	 * do not write the internal status.
	 */
	if((!c.async)){
		var data = r.responseText;
		if(o.returnFormat == 'json'){
			data = Railo.Json.decode(data);
		}else{
			data = data.replace(/\r\n/g, "");
		}
		return data;
	}

};


/*************************************************************************************************
 * FORM
 * Utility that extend normal browser form serialization and support form ajax form submission.
 *
 * Serialization from http://malsup.com/jquery  form.js jquery plugin
 *************************************************************************************************/

Railo.Form = (function(){

	function fieldValue(el, successful) {
	    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	    if (typeof successful == 'undefined') successful = true;

	    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
	        (t == 'checkbox' || t == 'radio') && !el.checked ||
	        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
	        tag == 'select' && el.selectedIndex == -1))
	            return null;

	    if (tag == 'select') {
	        var index = el.selectedIndex;
	        if (index < 0) return null;
	        var a = [], ops = el.options;
	        var one = (t == 'select-one');
	        var max = (one ? index+1 : ops.length);
	        for(var i=(one ? index : 0); i < max; i++) {
	            var op = ops[i];
	            if (op.selected) {
					var v = op.value;
					if (!v) // extra pain for IE...
	                	v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
	                if (one) return v;
	                a.push(v);
	            }
	        }
	        return a;
	    }
	    return el.value;
	}

	function formToArray(id) {

		var a = [];
	    var form = document.getElementById(id);
	    var els = form.elements;
	    if (!els) return a;

	    for(var i=0, max=els.length; i < max; i++) {
	        var el = els[i];
	        var n = el.name;
			/* skip if no attribute name has found */
	        if (!n) continue;
	        if (el.type == "image") {
	            if(!el.disabled) {
	            	a.push({
						name: n,
						value: el.value
					});
	            }
	            continue;
	        }

	        var v = fieldValue(el, true);
	        if (v && v.constructor == Array) {
	            for(var j=0, jmax=v.length; j < jmax; j++)
	                a.push({name: n, value: v[j]});
	        }
	        else if (v !== null && typeof v != 'undefined')
	            a.push({name: n, value: v});
	    }
	    return a;
	}


    return {

/**************************************************************************************************************
 * PUBLIC serialize
 * Return a literal object with the actual form value state. Ideal to be pushed into XHR object as data objetc.
 *
 * @param {String} id
 * @return {Object} res Literal object that represent the actual form fields values.
 **************************************************************************************************************/
		serialize : function(id){
			var a = formToArray(id);
			var res = {};
			for(var i=0;i<a.length;i++){
				if((a[i].name) && (a[i].value)){
					res[a[i].name] = a[i].value;
				}
			}
			return res;
		}
	}

})();


Railo.Bind = (function(){

	var binds = [];

	function bindAdapter(arg){
		arg[1].binds = [];
		for(var i=0; i < arg[1].bindExpr.length;i++){
			var o = {};
			o.name =  arg[1].bindExpr[i][0];
			o.event = arg[1].bindExpr[i][1];
			o.label = arg[1].bindExpr[i][3];
			if(arg[1].bindExpr[i][2] != ""){
				o.contId = arg[1].bindExpr[i][2];
			}
			arg[1].binds.push(o);
		}
		arg[1].eventName = arg[0];
		arg[1].errorEvent = arg[0] + 'errorHandler';
		arg[1].listener = eval(arg[1].listener);
		arg[1].errorHandler = eval(arg[1].errorHandler);
		arg[1].els = eval(arg[1].listener);
		/*
		 * add a namespace for the beforeSend function interception
		 */
		arg[1].beforeSend = "";

		binds[arg[1].eventName] = arg[1];

		/* register the error hanlder to be able to intercept parsing errors*/
		Railo.Events.registerEvent(arg[1].errorEvent);
		Railo.Events.subscribe(Railo.Ajax.exceptionHandler,arg[1].errorEvent);
	}

	function getEls(b){
		if(b.contId){
			var els = Sizzle("[id='" + b.contId + "'] [name='" + b.name + "']");
		}else{
			var els = Sizzle("[name='" + b.name + "']");
		}
		return els;
	}

	function getData(b){
		var data = {};
		for (var j=0; j < b.binds.length; j++) {
			if(b.binds[j].contId){
				data[b.binds[j].label] = Sizzle("[id='" + b.binds[j].contId + "'] [name='" + b.binds[j].name + "']")[0].value;
			}else{
				data[b.binds[j].label] = Sizzle("[name='" + b.binds[j].name + "']")[0].value;
			}
		}
		return data;
	}

/**********************************************************************************************************
 * PRIVATE addBindToDefault
 * If a bind has a 'bindTo' means that the goal is to fill the element with id {bindTo}.
 * Added default need to show the loading animated gif and to ask XHR to parse returned value as
 * plain before to pass them to the Railo.Ajax.innerHTML or other function specified as success callback.
 *
 * @param {Object} o XHR config object on final preparation step.
 * @param {Object} b Current Bind Obejct
 * @return void
 *********************************************************************************************************/
	function addBindToDefault(o,b){
		o.returnFormat = 'plain';
		if(typeof(o.beforeSend) != 'function'){
			o.beforeSend = function(){
				Railo.Ajax.showLoader(b.bindTo);
			};
		}
	}


	return{


/*********************************************************************************************************
 * PUBLIC getBind
 * Return the required stored bind object.
 *
 * @param {Object} name
 *********************************************************************************************************/
		getBind : function(name){
			return binds[name];
		},



/********************************************************************************************************
 * PUBLIC register
 *
 * @classDescription Craete a clean object from the Bind rules to inject proper info into the Handler setBind
 * @param {String} e  EventName
 * @param {Object} b  Bind rules
 * @param {Boolean} c If true binding events is dispatched after page load ends
 *
 ********************************************************************************************************/
		register : function(e,b,c){
			var handler = eval(b.handler);
			bindAdapter([e,b,c]);
			Railo.Events.registerEvent(b.eventName);
			Railo.Events.subscribe(handler,b.eventName);
			for (var i = 0; i < b.binds.length; i++) {
				if(b.binds[i].event != 'none'){
					var els = getEls(b.binds[i]);
					for(var e=0; e < els.length; e++){
						Railo.Util.addEvent(els[e],b.binds[i].event,function(){
							Railo.Events.dispatchEvent(b.eventName,b);
						});
					}
				}
			}
			if(c){
				Railo.Events.dispatchEvent(b.eventName,b);
			}
		},

		cfcBindHandler : function(b){
			var data = getData(b);
			var o ={
				url:b.url,
				method:b.method,
				beforeSend : b.beforeSend,
				argumentCollection:data,
				callbackHandler:function(d,t){
					b.listener(d,t,b);
				},
				errorHandler:function(x,y,z){
					var ev = Railo.Events.newEvent(b.errorEvent,[x,y,b]);
					Railo.Events.dispatchEvent(b.errorEvent,[x,y,b]);
				}
			}
			/*
			 * If we bindTo an element we set some default
			 */
			if(b.bindTo){
				addBindToDefault(o,b);
			}
			Railo.Ajax.call(o);
		},

		jsBindHandler : function(b){
			var data = getData(b);
			/* if data ha s1 item pass just the value*/
			var len = 0;
			for(k in data){var d = k;len++}
			if(len == 1){data = data[d];}
			b.listener(data);

		},



/********************************************************************************
 * URL BINDER HANDLER
 *
 * beforeSend : add a beforeSend to the bind object to overwrite the default.
 * 				Note that this run only if is defined a bindTo element.
 *
 *******************************************************************************/
		urlBindHandler : function(b){
			var data = getData(b);
			/*
			 * Prepare the XHR configs.
			 */
			var o = {
				url: b.url,
				data: data,
				beforeSend : b.beforeSend,
				callbackHandler:function(d,t){
					b.listener(d,t,b);
				},
				errorHandler: function(x, y, z){
					var ev = Railo.Events.newEvent(b.errorEvent, [x, y, b]);
					Railo.Events.dispatchEvent(b.errorEvent, [x, y, b]);
				}
			}

			/*
			 * If we bindTo an element we set some default
			 */
			if(b.bindTo){
				addBindToDefault(o,b);
			}

			Railo.Ajax.call(o);
		}
	}
})();

/***************************************************************************
 * JSON PARSER
 *
 * http://json.org
 ***************************************************************************/
Railo.Json = (function(){
	 var JSON = {};
	(function () {

	    function f(n) {
	        return n < 10 ? '0' + n : n;
	    }

	    if (typeof Date.prototype.toJSON !== 'function') {

	        Date.prototype.toJSON = function (key) {

	            return this.getUTCFullYear()   + '-' +
	                 f(this.getUTCMonth() + 1) + '-' +
	                 f(this.getUTCDate())      + 'T' +
	                 f(this.getUTCHours())     + ':' +
	                 f(this.getUTCMinutes())   + ':' +
	                 f(this.getUTCSeconds())   + 'Z';
	        };

	        String.prototype.toJSON =
	        Number.prototype.toJSON =
	        Boolean.prototype.toJSON = function (key) {
	            return this.valueOf();
	        };
	    }

	    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        gap,
	        indent,
	        meta = {
	            '\b': '\\b',
	            '\t': '\\t',
	            '\n': '\\n',
	            '\f': '\\f',
	            '\r': '\\r',
	            '"' : '\\"',
	            '\\': '\\\\'
	        },
	        rep;


	    function quote(string) {

	        escapable.lastIndex = 0;
	        return escapable.test(string) ?
	            '"' + string.replace(escapable, function (a) {
	                var c = meta[a];
	                return typeof c === 'string' ? c :
	                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	            }) + '"' :
	            '"' + string + '"';
	    }


	    function str(key, holder) {

	        var i,
	            k,
	            v,
	            length,
	            mind = gap,
	            partial,
	            value = holder[key];

	        if (value && typeof value === 'object' &&
	                typeof value.toJSON === 'function') {
	            value = value.toJSON(key);
	        }

	        if (typeof rep === 'function') {
	            value = rep.call(holder, key, value);
	        }
	        switch (typeof value) {
	        case 'string':
	            return quote(value);

	        case 'number':

	            return isFinite(value) ? String(value) : 'null';

	        case 'boolean':
	        case 'null':

	            return String(value);

	        case 'object':

	            if (!value) {
	                return 'null';
	            }
	            gap += indent;
	            partial = [];

	            if (Object.prototype.toString.apply(value) === '[object Array]') {

	                length = value.length;
	                for (i = 0; i < length; i += 1) {
	                    partial[i] = str(i, value) || 'null';
	                }

	                v = partial.length === 0 ? '[]' :
	                    gap ? '[\n' + gap +
	                            partial.join(',\n' + gap) + '\n' +
	                                mind + ']' :
	                          '[' + partial.join(',') + ']';
	                gap = mind;
	                return v;
	            }
	            if (rep && typeof rep === 'object') {
	                length = rep.length;
	                for (i = 0; i < length; i += 1) {
	                    k = rep[i];
	                    if (typeof k === 'string') {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            } else {
	                for (k in value) {
	                    if (Object.hasOwnProperty.call(value, k)) {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            }
	            v = partial.length === 0 ? '{}' :
	                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
	                        mind + '}' : '{' + partial.join(',') + '}';
	            gap = mind;
	            return v;
	        }
	    }
	    if (typeof JSON.stringify !== 'function') {
	        JSON.stringify = function (value, replacer, space) {
	            var i;
	            gap = '';
	            indent = '';
	            if (typeof space === 'number') {
	                for (i = 0; i < space; i += 1) {
	                    indent += ' ';
	                }

	            } else if (typeof space === 'string') {
	                indent = space;
	            }
	            rep = replacer;
	            if (replacer && typeof replacer !== 'function' &&
	                    (typeof replacer !== 'object' ||
	                     typeof replacer.length !== 'number')) {
	                throw new Error('JSON.stringify');
	            }
	            return str('', {'': value});
	        };
	    }
	    if (typeof JSON.parse !== 'function') {
	        JSON.parse = function (text, reviver) {
	            var j;

	            function walk(holder, key) {
	                var k, v, value = holder[key];
	                if (value && typeof value === 'object') {
	                    for (k in value) {
	                        if (Object.hasOwnProperty.call(value, k)) {
	                            v = walk(value, k);
	                            if (v !== undefined) {
	                                value[k] = v;
	                            } else {
	                                delete value[k];
	                            }
	                        }
	                    }
	                }
	                return reviver.call(holder, key, value);
	            }

	            cx.lastIndex = 0;
	            if (cx.test(text)) {
	                text = text.replace(cx, function (a) {
	                    return '\\u' +
	                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	                });
	            }
	            if (/^[\],:{}\s]*$/.
	test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
	replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
	replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
	                j = eval('(' + text + ')');
	                return typeof reviver === 'function' ?
	                    walk({'': j}, '') : j;
	            }
	            throw new SyntaxError('JSON.parse');
	        };
		}
	}());
	return {
		encode: function(o){
			return JSON.stringify(o);
		},
		decode: function(o){
			return JSON.parse(o);
		}

	}
})();


/**********************************************************************************************
 * Railo.Util
 **********************************************************************************************/
Railo.Util = {

	template : function(s,d){
		for(i=0; i < d.length; i++){
			var r = '{([^{\\' + i + '}]*)}';
			var x = new RegExp(r);
			s = s.replace(x,d[i]);
		}
		return s;
	},

	/*
	 * Add Dom Events
	 */
	addEvent : function( obj, type, fn ) {
  		if ( obj.attachEvent ) {
    		obj['e'+type+fn] = fn;
    		obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
    		obj.attachEvent( 'on'+type, obj[type+fn] );
  		}else
    		obj.addEventListener( type, fn, false );
	},

	/*
	 * Remove Dom Events
	 */
	removeEvent:function( obj, type, fn ) {
  		if ( obj.detachEvent ) {
    		obj.detachEvent( 'on'+type, obj[type+fn] );
    		obj[type+fn] = null;
  		} else
    		obj.removeEventListener( type, fn, false );
	},

	/**
	 *
	 * @param {String} s
	 */
	isUrl : function(s) {
		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		return regexp.test(s);
	},

	/**
	 *
	 * @param {String} s
	 */
	isEmail : function(s) {
		var regexp = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
		return regexp.test(s);
	},


	/**
	 * Search a match into an array. Return false or a set of matching nodes.
	 * @param {Array} arr
	 * @param {Object} searchStr
	 */
	arrayFind :  function(arr,searchStr) {
		var returnArray = false;
		for (i=0; i<arr.length; i++) {
			if (typeof(searchStr) == 'function') {
		    	if (searchStr.test(arr[i])) {
		        	if (!returnArray) { returnArray = [] }
		        	returnArray.push(i);
		      	}
		    } else {
		      	if (arr[i]===searchStr) {
		        	if (!returnArray) { returnArray = [] }
		        	returnArray.push(i);
		      	}
		    }
		 }
		return returnArray;
	}


}


Railo.init();
var ColdFusion = Railo;

(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,done=0,toString=Object.prototype.toString,hasDuplicate=false;var Sizzle=function(selector,context,results,seed){results=results||[];var origContext=context=context||document;if(context.nodeType!==1&&context.nodeType!==9){return[];}if(!selector||typeof selector!=="string"){return results;}var parts=[],m,set,checkSet,check,mode,extra,prune=true,contextXML=isXML(context);chunker.lastIndex=0;while((m=chunker.exec(selector))!==null){parts.push(m[1]);if(m[2]){extra=RegExp.rightContext;break;}}if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context);}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);while(parts.length){selector=parts.shift();if(Expr.relative[selector])selector+=parts.shift();set=posProcess(selector,set);}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){var ret=Sizzle.find(parts.shift(),context,contextXML);context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0];}if(context){var ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set);}else{prune=false;}while(parts.length){var cur=parts.pop(),pop=cur;if(!Expr.relative[cur]){cur="";}else{pop=parts.pop();}if(pop==null){pop=context;}Expr.relative[cur](checkSet,pop,contextXML);}}else{checkSet=parts=[];}}if(!checkSet){checkSet=set;}if(!checkSet){throw"Syntax error, unrecognized expression: "+(cur||selector);}if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet);}else if(context&&context.nodeType===1){for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&contains(context,checkSet[i]))){results.push(set[i]);}}}else{for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i]);}}}}else{makeArray(checkSet,results);}if(extra){Sizzle(extra,origContext,results,seed);Sizzle.uniqueSort(results);}return results;};Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=false;results.sort(sortOrder);if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1);}}}}};Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set);};Sizzle.find=function(expr,context,isXML){var set,match;if(!expr){return[];}for(var i=0,l=Expr.order.length;i<l;i++){var type=Expr.order[i],match;if((match=Expr.match[type].exec(expr))){var left=RegExp.leftContext;if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");set=Expr.find[type](match,context,isXML);if(set!=null){expr=expr.replace(Expr.match[type],"");break;}}}}if(!set){set=context.getElementsByTagName("*");}return{set:set,expr:expr};};Sizzle.filter=function(expr,set,inplace,not){var old=expr,result=[],curLoop=set,match,anyFound,isXMLFilter=set&&set[0]&&isXML(set[0]);while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.match[type].exec(expr))!=null){var filter=Expr.filter[type],found,item;anyFound=false;if(curLoop==result){result=[];}if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);if(!match){anyFound=found=true;}else if(match===true){continue;}}if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);var pass=not^!!found;if(inplace&&found!=null){if(pass){anyFound=true;}else{curLoop[i]=false;}}else if(pass){result.push(item);anyFound=true;}}}}if(found!==undefined){if(!inplace){curLoop=result;}expr=expr.replace(Expr.match[type],"");if(!anyFound){return[];}break;}}}if(expr==old){if(anyFound==null){throw"Syntax error, unrecognized expression: "+expr;}else{break;}}old=expr;}return curLoop;};var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href");}},relative:{"+":function(checkSet,part,isXML){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;if(isTag&&!isXML){part=part.toUpperCase();}for(var i=0,l=checkSet.length,elem;i<l;i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}checkSet[i]=isPartStrNotTag||elem&&elem.nodeName===part?elem||false:elem===part;}}if(isPartStrNotTag){Sizzle.filter(part,checkSet,true);}},">":function(checkSet,part,isXML){var isPartStr=typeof part==="string";if(isPartStr&&!/\W/.test(part)){part=isXML?part:part.toUpperCase();for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName===part?parent:false;}}}else{for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part;}}if(isPartStr){Sizzle.filter(part,checkSet,true);}}},"":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(!/\W/.test(part)){var nodeCheck=part=isXML?part:part.toUpperCase();checkFn=dirNodeCheck;}checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML);},"~":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!/\W/.test(part)){var nodeCheck=part=isXML?part:part.toUpperCase();checkFn=dirNodeCheck;}checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML);}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?[m]:[];}},NAME:function(match,context,isXML){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i]);}}return ret.length===0?null:ret;}},TAG:function(match,context){return context.getElementsByTagName(match[1]);}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";if(isXML){return match;}for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").indexOf(match)>=0)){if(!inplace)result.push(elem);}else if(inplace){curLoop[i]=false;}}}return false;},ID:function(match){return match[1].replace(/\\/g,"");},TAG:function(match,curLoop){for(var i=0;curLoop[i]===false;i++){}return curLoop[i]&&isXML(curLoop[i])?match[1]:match[1].toUpperCase();},CHILD:function(match){if(match[1]=="nth"){var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]=="even"&&"2n"||match[2]=="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0;}match[0]=done++;return match;},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name];}if(match[2]==="~="){match[4]=" "+match[4]+" ";}return match;},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if(chunker.exec(match[3]).length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop);}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);if(!inplace){result.push.apply(result,ret);}return false;}}else if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true;}return match;},POS:function(match){match.unshift(true);return match;}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden";},disabled:function(elem){return elem.disabled===true;},checked:function(elem){return elem.checked===true;},selected:function(elem){elem.parentNode.selectedIndex;return elem.selected===true;},parent:function(elem){return!!elem.firstChild;},empty:function(elem){return!elem.firstChild;},has:function(elem,i,match){return!!Sizzle(match[3],elem).length;},header:function(elem){return/h\d/i.test(elem.nodeName);},text:function(elem){return"text"===elem.type;},radio:function(elem){return"radio"===elem.type;},checkbox:function(elem){return"checkbox"===elem.type;},file:function(elem){return"file"===elem.type;},password:function(elem){return"password"===elem.type;},submit:function(elem){return"submit"===elem.type;},image:function(elem){return"image"===elem.type;},reset:function(elem){return"reset"===elem.type;},button:function(elem){return"button"===elem.type||elem.nodeName.toUpperCase()==="BUTTON";},input:function(elem){return/input|select|textarea|button/i.test(elem.nodeName);}},setFilters:{first:function(elem,i){return i===0;},last:function(elem,i,match,array){return i===array.length-1;},even:function(elem,i){return i%2===0;},odd:function(elem,i){return i%2===1;},lt:function(elem,i,match){return i<match[3]-0;},gt:function(elem,i,match){return i>match[3]-0;},nth:function(elem,i,match){return match[3]-0==i;},eq:function(elem,i,match){return match[3]-0==i;}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];if(filter){return filter(elem,i,match,array);}else if(name==="contains"){return(elem.textContent||elem.innerText||"").indexOf(match[3])>=0;}else if(name==="not"){var not=match[3];for(var i=0,l=not.length;i<l;i++){if(not[i]===elem){return false;}}return true;}},CHILD:function(elem,match){var type=match[1],node=elem;switch(type){case'only':case'first':while((node=node.previousSibling)){if(node.nodeType===1)return false;}if(type=='first')return true;node=elem;case'last':while((node=node.nextSibling)){if(node.nodeType===1)return false;}return true;case'nth':var first=match[2],last=match[3];if(first==1&&last==0){return true;}var doneName=match[0],parent=elem.parentNode;if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count;}}parent.sizcache=doneName;}var diff=elem.nodeIndex-last;if(first==0){return diff==0;}else{return(diff%first==0&&diff/first>=0);}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match;},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName===match;},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1;},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!=check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false;},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];if(filter){return filter(elem,i,match,array);}}}};var origPOS=Expr.match.POS;for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);}var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);if(results){results.push.apply(results,array);return results;}return array;};try{Array.prototype.slice.call(document.documentElement.childNodes,0);}catch(e){makeArray=function(array,results){var ret=results||[];if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array);}else{if(typeof array.length==="number"){for(var i=0,l=array.length;i<l;i++){ret.push(array[i]);}}else{for(var i=0;array[i];i++){ret.push(array[i]);}}}return ret;};}var sortOrder;if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){var ret=a.compareDocumentPosition(b)&4?-1:a===b?0:1;if(ret===0){hasDuplicate=true;}return ret;};}else if("sourceIndex"in document.documentElement){sortOrder=function(a,b){var ret=a.sourceIndex-b.sourceIndex;if(ret===0){hasDuplicate=true;}return ret;};}else if(document.createRange){sortOrder=function(a,b){var aRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();aRange.selectNode(a);aRange.collapse(true);bRange.selectNode(b);bRange.collapse(true);var ret=aRange.compareBoundaryPoints(Range.START_TO_END,bRange);if(ret===0){hasDuplicate=true;}return ret;};}(function(){var form=document.createElement("div"),id="script"+(new Date).getTime();form.innerHTML="<a name='"+id+"'/>";var root=document.documentElement;root.insertBefore(form,root.firstChild);if(!!document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[];}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return elem.nodeType===1&&node&&node.nodeValue===match;};}root.removeChild(form);root=form=null;})();(function(){var div=document.createElement("div");div.appendChild(document.createComment(""));if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);if(match[1]==="*"){var tmp=[];for(var i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i]);}}results=tmp;}return results;};}div.innerHTML="<a href='#'></a>";if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2);};}div=null;})();if(document.querySelectorAll)(function(){var oldSizzle=Sizzle,div=document.createElement("div");div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return;}Sizzle=function(query,context,extra,seed){context=context||document;if(!seed&&context.nodeType===9&&!isXML(context)){try{return makeArray(context.querySelectorAll(query),extra);}catch(e){}}return oldSizzle(query,context,extra,seed);};for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop];}div=null;})();if(document.getElementsByClassName&&document.documentElement.getElementsByClassName)(function(){var div=document.createElement("div");div.innerHTML="<div class='test e'></div><div class='test'></div>";if(div.getElementsByClassName("e").length===0)return;div.lastChild.className="e";if(div.getElementsByClassName("e").length===1)return;Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1]);}};div=null;})();function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){if(sibDir&&elem.nodeType===1){elem.sizcache=doneName;elem.sizset=i;}elem=elem[dir];var match=false;while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;elem.sizset=i;}if(elem.nodeName===cur){match=elem;break;}elem=elem[dir];}checkSet[i]=match;}}}function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){if(sibDir&&elem.nodeType===1){elem.sizcache=doneName;elem.sizset=i;}elem=elem[dir];var match=false;while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;elem.sizset=i;}if(typeof cur!=="string"){if(elem===cur){match=true;break;}}else if(Sizzle.filter(cur,[elem]).length>0){match=elem;break;}}elem=elem[dir];}checkSet[i]=match;}}}var contains=document.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)&16;}:function(a,b){return a!==b&&(a.contains?a.contains(b):true);};var isXML=function(elem){return elem.nodeType===9&&elem.documentElement.nodeName!=="HTML"||!!elem.ownerDocument&&elem.ownerDocument.documentElement.nodeName!=="HTML";};var posProcess=function(selector,context){var tmpSet=[],later="",match,root=context.nodeType?[context]:context;while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"");}selector=Expr.relative[selector]?selector+"*":selector;for(var i=0,l=root.length;i<l;i++){Sizzle(selector,root[i],tmpSet);}return Sizzle.filter(later,tmpSet);};window.Sizzle=Sizzle;})();