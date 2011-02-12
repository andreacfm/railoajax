var extLoader = function(config){
	config.CFWINDOW.js = ['ext-base','ext-all','RailoWindow-Ext'];
}
Railo.Events.subscribe(extLoader,'Railo.beforeDoImport');
