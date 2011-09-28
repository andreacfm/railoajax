describe("RailoAjax", function() {
	
	describe("loading", function() {
		
		it("should have registerd event onLoad", function() {
		  expect(Railo.Events.getEvents()['onLoad']).toBeDefined();
		});
	  
	});
	
});