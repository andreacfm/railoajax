component extends="mxunit.framework.TestCase" {
	
	function setUp(){
	    binder = createObject("component", "src.tag.railo.core.ajax.AjaxBinder").init();
	}
	
	function tearDown(){
		
	}

    public void function url_bind_with_no_bind_synstax_should_not_generate_a_bind_expression(){
        var uri = "url:index.cfm?action=todo.list&name={form.name}&newaction=doit.do&nome={test}";
        var res = binder.parseBind(uri);
        assertEquals('index.cfm?action=todo.list&newaction=doit.do',res.url);
        assertEquals(2,arraylen(res.bindExpr),"bind expression should have 1 item");
    }


}
