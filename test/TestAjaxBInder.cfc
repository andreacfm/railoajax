component extends="mxunit.framework.TestCase" {
	
	function setUp(){
	    binder = createObject("component", "src.tag.railo.core.ajax.AjaxBinder").init();
	}
	
	function tearDown(){
		
	}

    public void function url_bind_with_no_bind_synstax_should_not_generate_a_bind_expression(){
        var uri = "url:index.cfm?action=todo.list&name={form.name}";
        var res = binder.parseBind(uri);

        debug(res);

        assertEquals('index.cfm',res.url);
        assertEquals(1,arraylen(res.bindExpr),"bind expression should have 1 item");
    }


}
