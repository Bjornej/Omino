describe("View", function() {
	var testView, testInstance;

	beforeEach(function() {
		testView = Omino.View.extend({});
		testInstance = new testView({});
	});

	describe("constructor", function() {
		it("creates a div tag", function() {
			testInstance.el.should.be.equal("<div />");
		});


		it("creates a specific tag", function() {
			testView = Omino.View.extend({
				tagName: "table"
			});
			testInstance = new testView({});
			testInstance.el.should.be.equal("<table />");
		});

		it("creates el with a specific class", function() {
			testView = Omino.View.extend({
				className: "prova"
			});
			testInstance = new testView({});
			testInstance.el.should.be.equal("<div class=\"prova\" />");
		});

	});


	describe("render", function() {
		it("should call beforeRender",function(){
			var test = sinon.spy();
			testView = Omino.View.extend({
				beforeRender : test,
				template : function(){return "";},
				serializeData:function(){return {};}
			});
			testInstance = new testView({});
			testInstance.render();
			test.should.have.been.called;
		});

		it("should trigger the before:render event",function(){
			var test = sinon.spy();
			testView = Omino.View.extend({
				template : function(){return "";},
				serializeData:function(){return {};}
			});

			testInstance = new testView({});
			testInstance.on("before:render",test);
			testInstance.render();
			test.should.have.been.called;
		});

		it("should call afterRender",function(){
			var test = sinon.spy();
			testView = Omino.View.extend({
				afterRender : test,
				template : function(){return "";},
				serializeData:function(){return {};}
			});
			testInstance = new testView({});
			testInstance.render();
			test.should.have.been.called;
		});

		it("should trigger the after:render event",function(){
			var test = sinon.spy();
			testView = Omino.View.extend({
				template : function(){return "";},
				serializeData:function(){return {};}
			});

			testInstance = new testView({});
			testInstance.on("after:render",test);
			testInstance.render();
			test.should.have.been.called;
		});

		it("should render the template function set as template property",function(){
			testView = Omino.View.extend({
				template : function(){return "test"},
				serializeData:function(){return {};}
			});
			testInstance = new testView({});
			testInstance.render();
			testInstance.$el.text().should.be.equal("test");
		});	

		it("should pass the serializeData function result to the function template",function(){
			var test=sinon.spy();
			testView = Omino.View.extend({
				template : test,
				serializeData:function(){return { prova : 2};}
			});
			testInstance = new testView({});
			testInstance.render();
			test.should.have.been.calledWith({ prova : 2});
		});	

	});


});