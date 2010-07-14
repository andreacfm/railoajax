Railo.Window = (function(){
		
	var adapter = new Railo.adapters.Window();
	
/**
 * getAdapter
 * @return  {Object} adapter
 * 
 */
function getAdapter(){
	return adapter;
}

return {


/**
 * @param {Object} name
 */

getWindowObject : function(name){
	return getAdapter().getWindowObject(name);				
},
	

/**
 * Check if a window already exists.
 * @param {Object} name
 */
windowExists : function(name){
	return getAdapter().windowExists(name);
},

		
/**
 * @param {Object} name
 * @param {Object} title
 * @param {Object} url
 * @param {Object} options
 * 		{refreshOnShow, width, height, minWidth, minHeight, modal, autoOpen, resizable, draggable}
 * @param {Object} bind - Name of the Registered Bind Object  
 */
create: function(name,title,url,options,bind){
	
	var adapter = getAdapter();
	
	// BeforeCreate -- get passed the arguments array 
	Railo.Events.dispatchEvent('Window.beforeCreate',arguments);
	
	//Call create on the adapter
	adapter.create(name,title,url,options,bind);
	
	//Get the object
	var object = this.getWindowObject(name);

	//AfterCreate -- get passed the window object
	Railo.Events.dispatchEvent('Window.afterCreate',object);

	//if initShow call show method
	if(options.initShow){
		this.show(name);
	}
	
},



/**
 * @param {Object} name
 */
show : function(name){
	
	var adapter = getAdapter();
	var object = this.getWindowObject(name);
	
	// beforeShow -- get passed object 
	Railo.Events.dispatchEvent('Window.beforeShow',object);
	
	//call show on adapter
	adapter.show(name);
	
	// afterShow -- get passed object 
	Railo.Events.dispatchEvent('Window.afterShow',object);
	
},


/**
 * hide
 * @param {Object} name
 */
hide : function(name){

	var adapter = getAdapter();
	var object = this.getWindowObject(name);
	
	// beforeHide -- get passed object 
	Railo.Events.dispatchEvent('Window.beforeHide',object);
	
	//call hide on adapter
	adapter.hide(name);
	
	// afterShow -- get passed object 
	Railo.Events.dispatchEvent('Window.afterHide',object);

},



/**
 * @param {Object} name
 * @param {Object} handler
 */
onHide : function(name,handler){

	var adapter = getAdapter();
	adapter.onHide(name,handler);			
	
},


	
/**
 * PUBLIC onshow
 * @param {Object} name
 * @param {Object} handler
 */
onShow : function(name,handler){
	
	var adapter = getAdapter();
	adapter.onShow(name,handler);			

}		

}
		
})();

