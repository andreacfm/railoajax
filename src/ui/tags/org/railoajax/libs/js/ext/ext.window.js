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
Railo.adapters.Window = function(){
	
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
 * @param {Object} name
 * @param {Object} title
 * @param {Object} url
 * @param {Object} options
 * 		{refreshOnShow, width, height, minWidth, minHeight, modal, autoOpen, resizable, draggable}
 * @param {Object} bind - Name of the Registered Bind Object  
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
	//If needed the show method will be invoked by the interface. 
	options.autoOpen = false;
	// ext need this for avoiding object to be destroyed onhide
	options.closeAction = options.closeAction ? options.closeAction : 'hide';
	options.applyTo = name;
	
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
	
	var listener = function(data,text,bindObject){
		Railo.Window.getWindowObject(name).body.update(data);
	}
	var beforeSend = function(bind){
		Railo.Window.getWindowObject(name).getUpdater().showLoading();
	}
	
	Railo.Bind.getBind(bind).listener = listener;
	Railo.Bind.getBind(bind).beforeSend = beforeSend;
					
	//Create the window
	var w = new Ext.Window(options);		
	
	//Register the window in the local repository
	_windows[name] = {};			
	_windows[name].object = w;
	_windows[name].options = options;
	_windows[name].bind = bind;
	//Flag that window content has not been yet loaded
	_windows[name].loaded = false;

},



/**
 * PUBLIC show
 * @param {Object} name
 */

show : function(name){

	var w = this.getWindowObject(name);
	
	w.show();

	if(_windows[name].bind){
		if((_windows[name].options.refreshOnShow) || (!_windows[name].loaded)){
			Railo.Events.dispatchEvent(_windows[name].bind,Railo.Bind.getBind(_windows[name].bind));	
			_windows[name].loaded = true;
		}			
	}
	
},



/**
 * PUBLIC hide
 * @param {Object} name
 */
hide : function(name){
	var w = this.getWindowObject(name);		
	w.hide();
},



/**
 * @param {Object} name
 * @param {Object} handler
 */

onHide : function(name,handler){
	var w = this.getWindowObject(name);	
	w.addListener('beforehide',function(){
		handler(name);
	},this)
},


	
/**
 * @param {Object} name
 * @param {Object} handler
 */
onShow : function(name,handler){
	var w = this.getWindowObject(name);	
	w.addListener('beforeshow',function(){
		handler(name);
	},this)	
}		

}
}

