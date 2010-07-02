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
Railo.Layout = (function(){
		

var adapter = new Railo.adapters.Layout();

/**
 * getAdapter
 * @return  {Object} adapter
 */
function getAdapter(){
	return adapter;
}

return {


/**
 * Return the js tab object depending on the implemented library.
 * @param {String} name
 * @return {Object} tab layout object 
 */
getTabLayout : function(name){
	
	var adapter = getAdapter();
	return adapter.getTabLayout(name);
},				


				
/**
 * Initialize a tab layout. Id represent the dom element where layout will be based.
 * @param {String} Name and dom id.
 * @return void 
 */
initializeTabLayout : function(name,options){

	var adapter = getAdapter();

	Railo.Events.dispatchEvent('Layout.beforeTabInit',arguments);
	
	adapter.initializeTabLayout(name,options);

	Railo.Events.dispatchEvent('Layout.afterTabInit',Railo.Layout.getTabLayout(name));
		
},
		
	
/**
 * @classDescription create a tab into an tab layout already initialized
 * @param {Object} layout
 * @param {Object} name
 * @param {Object} title
 * @param {Object} url
 * @param {Object} options
 * @return void
 */

createTab : function(layout,name,title,url,options){
	
	var adapter = getAdapter();	

	Railo.Events.dispatchEvent('Layout.beforeTabCreate',arguments);

	adapter.createTab(layout,name,title,url,options);
	
	Railo.Events.dispatchEvent('Layout.afterTabCreate',arguments);
	
},



/**
 * @classDescription Remove a tab
 * @param {String} layout
 * @param {String} layoutArea
 * @return void
 */		
removeTab : function(layout,layoutArea){
	
	var adapter = getAdapter();	

	Railo.Events.dispatchEvent('Layout.beforeTabRemove',arguments);

	adapter.removeTab(layout,layoutArea);
	
	Railo.Events.dispatchEvent('Layout.afterTabRemove',arguments);

},




/**
 * @classDescription Remove the last tab in a defined layout
 * @param {String} layout
 * @return void
 */		
removeLastTab : function(layout){
	
	var adapter = getAdapter();	
	
	Railo.Events.dispatchEvent('Layout.beforeTabRemove',[layout]);
	
	adapter.removeLastTab(layout);	
	
	Railo.Events.dispatchEvent('Layout.afterTabRemove',[layout]);

},




/**
 * @classDescription Remove the tab based on the passed 0 based index.
 * @param {String} layout
 * @param {Integer} index
 */		
removeTabByIndex : function(layout,index){

	var adapter = getAdapter();	
	
	Railo.Events.dispatchEvent('Layout.beforeTabRemove',arguments);
	
	adapter.removeTabByIndex(layout,index);	
	
	Railo.Events.dispatchEvent('Layout.afterTabRemove',arguments);
	
},




/**
 * @classDescription Select a tab
 * @param {Object} layout
 * @param {Object} layoutArea
 * @return void
 */	
selectedTab : function(layout,layoutArea){
	
	var adapter = getAdapter();	
	
	Railo.Events.dispatchEvent('Layout.beforeTabSelect',arguments);
	
	adapter.selectedTab(layout,layoutArea);	
	
	Railo.Events.dispatchEvent('Layout.afterTabSelect',arguments);
},
		
		

		
/**
 * @classDescription Disable a tab
 * @param {Object} layout
 * @param {Object} layoutArea
 * @return void
 */
disableTab : function(layout,layoutArea){
	var adapter = getAdapter();	
	
	Railo.Events.dispatchEvent('Layout.beforeTabDisable',arguments);
	
	adapter.disableTab(layout,layoutArea);	
	
	Railo.Events.dispatchEvent('Layout.afterTabDisable',arguments);
},




/**
 * @classDescription Enable a tab
 * @param {Object} layout
 * @param {Object} layoutArea  Can be a string or an array of Strings
 */
enableTab : function(layout,layoutArea){
	
	var adapter = getAdapter();	
	
	Railo.Events.dispatchEvent('Layout.beforeTabEnable',arguments);
	
	adapter.enableTab(layout,layoutArea);	
	
	Railo.Events.dispatchEvent('Layout.afterTabEnable',arguments);
	
}
}
})();
