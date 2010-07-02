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
Railo.adapters.Layout = function(){

var layouts = {};
var layoutAreas = {};


			
/**
 * Get the index/s of the passed layoutArea
 * @param {Object} jquery ui object 
 * @param {Object} names
 */
function getIndexFromName(layout,names){
	var panels = layout.find('div.ui-tabs-panel');
	var result = [];
	
	if(!panels.length){
		Railo.globalErrorHandler('layout.LayoutHasNoChildren',[layout]);
	}else{
		for(var i=0; i<panels.length; i++){
			for (var n = 0; n < names.length; n++) {
				if ($(panels[i]).attr('id') == names[n]) {
					result.push(i);
				}
			}
		}
	}
	return result;	
}



/**
 * @classDescription listen to any tab selection. 
 * The method is eesponsible to trigger the bind ( if any )  and to dispatch the 'Layout.afterTabSelect' event.
 * @param {Object} event
 * @param {Object} ui
 */
function selectHandler(event,ui){
	var area = layoutAreas[ui.panel.id];
	var layoutName = $(document.getElementById(ui.panel.id)).parent().attr('id');
	var layout = layouts[layoutName];
	
	if(area && area.options.bind){
		/*
		 * Load only if is not loaded or is asked 
		 * to reload any time tab is acttivated
		 */
		var go = false;
		if(!area.loaded){
			go = true;							
		}else if(area.options.refreshOnActivate == true || area.options.refreshOnActivate == 'true'){
			go = true;
		}
		if(go){
			Railo.Events.dispatchEvent(area.options.bind,Railo.Bind.getBind(area.options.bind));
			area.loaded = true;					
		}
	}
	/* if exists a custom select call back fire it*/ 
	if(layout.options.tabsselect){
		var f = eval(configs.tabsselect);
		f(event,ui);
	}
	
	Railo.Events.dispatchEvent('Layout.afterTabSelect',ui);

}
	

return {
				

/**
 * Return the jquery ui tab object
 * @param {String} name
 * @return {Object} tab object 
 */
getTabLayout : function(name){
	try{
		var l = layouts[name].object;
		return l;				
	}
	catch(e){
		Railo.globalErrorHandler('layout.LayoutNotFound',[name]);
		return;
	}
		
},				



				
/**
 * @classDescription Tabsselect callback is handled manually to be sure Railo listener is applied first. He will then manually call the
 * callback. Proceeding in another way should brake binding support. 	
 * @param {String} name
 * @param {Object} init options parameters  
 */
initializeTabLayout : function(name,options){
	
	/*
	 * By default tab is cached. Use attribute 'refreshOnActivate' to force tab to be reloaded
	 * any time is selected
	 */
	options.cache = true;
	
	/* Handler of tabs selection */
	options.select = selectHandler;
	
	if(options.tabsadd){options.add = eval(options.tabsadd);}
	if(options.tabsremove){options.remove = eval(options.tabsremove);}
	if(options.tabsenable){options.enable = eval(options.tabsenable);}
	if(options.tabsdisable){options.disable = eval(options.tabsdisable);}
	
	/*Create the tab*/
	var t = $(document.getElementById(name)).tabs(options);
	
	layouts[name] = {};	
	layouts[name].options = options;
	layouts[name].object = t;
	
},
		

	
/**
 * @classDescription Create a new Tab.
 * If a url is passed is created a binding using the BindUrlHandler. When a tab is created also receive focus and is automatically selected.
 * @param {String} layout
 * @param {String} name
 * @param {String} title
 * @param {String} url
 * @param {Object} options
 */
createTab : function(layout,name,title,url,options){
	
	var layoutObj = this.getTabLayout(layout);
	var tabheight = layouts[layout].options.tabheight;

	if(options.index == 'undefined'){options.index = layoutObj.tabs('length');}
	
	/*if no name is passed generate a new one */
	if(!name){
		name = '_cf_layout_tab' + Math.ceil(Math.random() * 100000000);
	};	

	/* 
	 * Create tab from tag never has an url ( bind is registered at runtime ).
	 * If a url exists means we need to create a bind 
	 */
	if(url){
		var rand = '_cf_layout_tab' + Math.ceil(Math.random() * 100000000);		
		/*register the bind*/
		Railo.Bind.register(rand,{"bindTo": name,"bindExpr":[],"url":url,"errorHandler":options.onBindError,"handler":"Railo.Bind.urlBindHandler","listener":"Railo.Ajax.innerHtml"},false);			
		options.bind = rand;
	}
	
	layoutObj.tabs('add','#' + name,title,options.index);

	layoutAreas[name] = {};
	layoutAreas[name].options = options;
	layoutAreas[name].loaded = false;
	
	if(options.selected == 'true' || options.selected == true){
		Railo.Layout.selectedTab(layout,name);
		// force bind : looks like jquery ui do not invoke the callback
		if(options.bind){
			Railo.Events.dispatchEvent(options.bind,Railo.Bind.getBind(options.bind));
			layoutAreas[name].loaded = true;
		}
	}

	if(options.disabled == 'true' || options.disabled == true){
		Railo.Layout.disableTab(layout,name);
	}
	
	// adjust the tab styling
	var style = 'overflow:' + options.overflow + ';' + 'height:' + tabheight + 'px;';

	if(typeof(options.style) != undefined){
		style = style + options.style;
	}
	
	$('#' + name).attr('style',style);
	
	
},



/**
 * @classDescription Remove a tab. The configs stored in local scope are removed too. 
 * @param {String} layout
 * @param {String} layoutArea
 */		
removeTab : function(layout,layoutArea){
	
	var layoutObj = this.getTabLayout(layout);
	
	if(typeof(layoutArea) != 'object'){
		layoutArea = [layoutArea];
	}
	
	var ix = getIndexFromName(layoutObj,layoutArea);
	
	for(var i=0; i< ix.length; i++){
		layoutObj.tabs('remove',ix[i]);
		// remove the bind
		if(layoutAreas[layoutArea].options.bind){
			Railo.Events.removeEvent(layoutAreas[layoutArea].options.bind);						
		}
		// clean the local scope
		layoutAreas[layoutArea] = null;
	}
},



/**
 * @classDescription Remove the last tab in a defined layout
 * @param {String} layout
 */		
removeLastTab : function(layout){
	var layoutObj = this.getTabLayout(layout);
	var ix = layoutObj.tabs('length') - 1;
	var layoutArea = layoutObj.find('div.ui-tabs-panel')[ix].id;
	Railo.Layout.removeTab(layout,layoutArea);
},



/**
 * @classDescription Remove the tab based on the passed 0 based index.
 * @param {String} layout
 */		
removeIndexTab : function(layout,index){
	var layoutObj = this.getTabLayout(layout);
	var tabsDiv = layoutObj.find('div.ui-tabs-panel')
	Railo.Layout.removeTab(layout,$(tabsDiv[index]).attr('id'));
},




/**
 * @classDescription Select a tab. Match is done via name of the layout and layoutarea.
 * @param {String} layout
 * @param {String} layoutArea
 * @return void
 */	
selectedTab : function(layout,layoutArea){
	var layout = this.getTabLayout(layout);
	layout.tabs('select',layoutArea);
},
		
		
		
/**
 * @classDescription Disable a spcific tab. If a tab has focus cannot be disabled. 
 * Another tab must be selected before
 * @param {String} layout
 * @param {String} layoutArea
 * @return void
 */
disableTab : function(layout,layoutArea){
	
	var layoutObj = this.getTabLayout(layout);
	
	/* 
	 * jQuery get an array while cf8 compatibility says string.
	 * Force string into array so we can keep jQuery faster array proceed.
	 */
	
	if(typeof(layoutArea) != 'object'){
		layoutArea = [layoutArea];
	}
	
	var ix = getIndexFromName(layoutObj,layoutArea);
	
	for(var i=0; i< ix.length; i++){
		layoutObj.tabs('disable',ix[i]);							
	}
				
},




/**
 * @classDescription Enable a tab. Once enabled the tab receive focus.
 * Also the select events is triggered.
 * @param {Object} layout
 * @param {Object} layoutArea  Can be a string or an array of Strings
 */	
enableTab : function(layout,layoutArea){

	var layoutObj = this.getTabLayout(layout);
	
	// if is not an array force create it.
	if(typeof(layoutArea) != 'object'){
		layoutArea = [layoutArea];
	}
	
	// get the index/s
	var ix = getIndexFromName(layoutObj,[layoutArea]);
	
	// Enable
	for(var i=0; i< ix.length; i++){
		layoutObj.tabs('enable',ix[i]);							
	}
	
	// Give focus to the last tab enables
	this.selectedTab(layout,layoutArea[layoutArea.length-1]);

}
}
};
