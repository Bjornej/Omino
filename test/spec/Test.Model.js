describe("Model",function(){
	var testModel,testInstance;

	beforeEach(function(){
		debugger;
		testModel = Omino.Model.extend({});
		testInstance = new testModel({});
	});

	describe("set",function(){

		it("should set an attribute",function(){
			testInstance.set("prova",2);
			testInstance.get("prova").should.equal(2);
		});

		it("should trigger a change event",function(){
			var listener = sinon.spy();
			testInstance.on("change",listener,this)
			testInstance.set("prova",2);
			listener.should.have.been.called;
		});

		it("should trigger a specific change event",function(){
			var listener = sinon.spy();
			testInstance.on("change:prova",listener,this)
			testInstance.set("prova",2);
			listener.should.have.been.called;
		});	

		it("should not trigger a change event if value equals current",function(){
			var listener = sinon.spy();
			testInstance.set("prova",2);		
			testInstance.on("change",listener)
			testInstance.set("prova",2);
			listener.should.not.have.been.called;
		});		

	});


	describe("get",function(){
		it("should get an attribute",function(){
			testInstance.set("prova",2);
			testInstance.get("prova").should.equal(2);
		});
	});	

	describe("unset",function(){
		it("should unset an attribute",function(){
			testInstance.set("prova",2);
			testInstance.unset("prova");
			expect(testInstance.get("prova")).to.equal(undefined);
		});
	});		

});