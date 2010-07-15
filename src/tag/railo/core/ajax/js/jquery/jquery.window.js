Railo.adapters.Window = function(){
	
	// Private windows repository
	var _windows = {};
	
	return {



/**
 * getWindowObject
 * @param {Object} name
 * @return {Object} window from the internal repository.
 */
	
getWindowObject : function(name){
	try{
		var w = _windows[name].object;
		if(!w){Railo.globalErrorHandler('window.windowNotFound',[n]);}
	}catch(e){
		alert(e);
	}
	return w;		
},

/**
 * Check if a window already exists.
 * @param {Object} name
 */
windowExists : function(name){
	return _windows[name] != undefined;
},
		
/**
 * @param {Object} name
 * @param {Object} title
 * @param {Object} url
 * @param {Object} options
 * 		{refreshOnShow, width, height, minWidth, minHeight, modal, autoOpen, resizable, draggable}
 * @param {Object} bind - Name of the Registered Bind Object  
 * 
 * Get the bind object : bindObj = Railo.Bind.getBind(bind)
 * Apply the required changes and then trigger the bind : Railo.Events.dispatchEvent(bind,bindObj);
 * NOTE : normal bind use Railo.Ajax.innerHTML as listener and Railo.Ajax.showLoader. Both this act on the element with 
 * id = name that has been created. Change the listener before the bind is triggered to manage a different behaviour.
 * 
 */
create: function(name,title,url,options,bind){
	
	//Options
	if(!options){options = {}};
	options.title = title;		
	options.refreshOnShow = options.refreshOnShow ? options.refreshOnShow : false;
	options.width = options.width ? options.width : 500;
	options.height = options.height ? options.height : 300;
	options.minWidth = options.minWidth ? options.minWidth : 150;
	options.minHeight = options.minHeight ? options.minHeight : 150;
	if(options.modal == 'undefined'){options.modal = false};
	if(options.resizable == 'undefined'){options.resizable = true};
	if(options.draggable == 'undefined'){options.draggable = true};
	
	//position
	if(options.x != 'undefined' && options.x >= 0 && options.y != 'undefined' && options.y >= 0){
		options.position = [options.x,options.y];
	}
	
	//If needed the show method will be invoked by the interface. 
	options.autoOpen = false;
	
	if(_windows[name]){
		Railo.globalErrorHandler('window.windowAlreadyExists',[name]);
		return;
	}
	
	/* 
	 * No Bind. Can be a window created via js library or a static content win.
	 */
	if(!bind){			
		var el = document.getElementById(name);
		if(!el){
			var el = document.createElement('div');			
			el.id = name;
			document.getElementsByTagName('body')[0].appendChild(el);
		}
	}

	/*
	 * If a url is passed but not a bind Register the bind.
	 */
	if((typeof(url) != undefined) && (!bind)){
		var rand_no = Math.ceil(Math.random()*1000000);
		bind = '_Railo_Win_' + rand_no;
		Railo.Bind.register(bind,{"bindTo":name,"bindExpr":[],"url":url,"errorHandler":"","handler":"Railo.Bind.urlBindHandler","listener":"Railo.Ajax.innerHtml"},false);
	}		
					
	//Create the window.
	var w = $(document.getElementById(name)).dialog(options);		
	
	//Register the window in the local repository
	_windows[name] = {};			
	_windows[name].object = w;
	_windows[name].options = options;
	_windows[name].bind = bind;
	//Flag that window content has not been yet loaded
	_windows[name].loaded = false;

},


/**
 * @param {String} name
 */
show : function(name){

	var w = this.getWindowObject(name);
	
	w.dialog('open');

	if(_windows[name].bind){
		if((_windows[name].options.refreshOnShow) || (!_windows[name].loaded)){
			Railo.Events.dispatchEvent(_windows[name].bind,Railo.Bind.getBind(_windows[name].bind));	
			_windows[name].loaded = true;
		}			
	}
	
},



/**
 * @param {Object} name
 */
hide : function(name){
	var w = this.getWindowObject(name);		
	w.dialog('close');
},



/**
 * @param {Object} name
 * @param {Object} handler
 */

onHide : function(name,handler){
	var w = this.getWindowObject(name);	
	w.bind('dialogclose',function(){
		handler(name);
	})	
},


	
/**
 * @param {Object} name
 * @param {Object} handler
 */
onShow : function(name,handler){
	var w = this.getWindowObject(name);	
	w.bind('dialogopen',function(){
		handler(name);
	})	
	
}		
}	
}

