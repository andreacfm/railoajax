/*		
Project:     @projectName  @projectUrl
Author:      @author <@authorEmail>
Version:     @projectVersion
Build Date:  @date
Build:		 @number

Copyright @year @author

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.	
			
*/
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
 * @param {String} Error message class name.
 * @param {Object} Literal Object that contains the values to be replaced into the the template message. 
 */
globalErrorHandler : function(err,data){
	var err = err.split('.');
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
 * @param {string} name
 * @param {Object} data
 * @param {Function} callback ( not used in Railo Implementation )
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
 * @param {Object} obj
 * @param {String} event
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
	if(opt.async == false){async = false;};
	var success = opt.success ? opt.success : null;
	var beforeSend = opt.beforeSend ? opt.beforeSend : null;
	var error = opt.error ? opt.error : null;
	var dataType = opt.dataType ? opt.dataType : 'json';
	var data = opt.data ? opt.data : {};

	var x = this.createXhrObject();

	/* query string */
	var qs = "";
	
	if(data){
		for(key in data){
			var param = '&' + key + '=' + data[key];
			qs  = qs + param;
		}
	}
	
	/*add a random string for forcing browser to call again */
	if(!opt.cache){
		var rand_no = Math.ceil(Math.random()*1000000000);
		qs = qs + '&_' + rand_no;
	}
	
	if((type == 'GET') && (qs)){
		qs = qs.replace('&','?');
		url = url + qs;		
	}else{
		qs = qs.replace('&','');
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

	if(type == 'POST'){
		/* this declare call as a post */
		x.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	}else{
		/* if no post be sure qs is null*/
		qs = null;
	}

	if((typeof(beforeSend) == 'function')){
		beforeSend(x);
	};	

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
			'google' : ['http://www.google.com/jsapi?key={_cf_params.googlemapkey}','google/google-map']
		}, 
		js : ['RailoMap'],
		events :[]
	},
	"CFWINDOW" : {
		libs : {
			'jquery' : ['jquery/jquery-1.3.2','jquery/ui.core','jquery/ui.dialog','jquery/ui.resizable','jquery/ui.draggable','jquery/jquery.window'],
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
			'jquery' : ['jquery/jquery-1.3.2','jquery/ui.core','jquery/ui.tabs','jquery/jquery.layout'],
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
	},
	"CFMENU" : {
		libs : {
			'yui' : ['yui/yahoo-dom-event/yahoo-dom-event','yui/container/container_core-min','yui/menu/menu-min']
			},  
		js : [],
		events :[]		
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
		},

		"CFMENU" : {
			'yui' : ['yui/fonts-min','yui/menu-core','yui/menu-skin']	 
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
function doImport(name,lib,provider){
	
	if(!config[name]){
		Railo.globalErrorHandler('ajax.tagDoNotExists',[name]);
	}
	
	/* jquery is the default library */
	if(!lib){
		lib = 'jquery';
	}

	if(_cf_params.jslib){
		lib = _cf_params.jslib;
	}

	if(!provider){
		provider = null;
	}
	
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
		for(var i=0; i < config[name]['libs'][lib].length; i++){
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
					document.write('<script type="text/javascript" src="' + _cf_ajaxscriptsrc + config[name]['provider'][provider][i] + '"><\/script>');					
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
			document.write('<script type="text/javascript" src="' + _cf_ajaxscriptsrc + config[name]['js'][i] + '"><\/script>');
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
importTag : function(name,lib,provider){
	doImport(name,lib,provider);
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
			var options = options || {};
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
			
			// not required
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
	}


}


Railo.init();
var ColdFusion = Railo;
