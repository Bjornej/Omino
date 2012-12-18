describe("View",function(){
	var testView,testInstance;

	beforeEach(function(){
		testView = Omino.View.extend({});
		testInstance = new testView({});
	});

	describe("constructor",function(){
		it("creates a div tag",function(){
			testInstance.el.should.be.equal("<div />");
		});


		it("creates a specific tag",function(){
			testView = Omino.View.extend({ tagName : "table"});
			testInstance = new testView({});
			testInstance.el.should.be.equal("<table />");
		});

		it("creates el with a specific class",function(){
			testView = Omino.View.extend({ className : "prova"});
			testInstance = new testView({});
			testInstance.el.should.be.equal("<div class=\"prova\" />");
		});

	});

});