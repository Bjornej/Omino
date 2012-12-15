describe("Collection", function() {
	var testCollection, testInstance;

	beforeEach(function() {
		testCollection = Omino.Collection.extend({});
		testInstance = new testCollection({});
	});

	describe("add", function() {
		it("should add an element to a collection", function() {
			var a = new Omino.Model();
			a.set("prova",2);
			testInstance.add(a);
			testInstance.at(0).should.deep.equal(a);
		});

		it("should trigger an add event", function() {
			var a = new Omino.Model();
			a.set("prova",2);
			var spy = sinon.spy();
			testInstance.on("add",spy);
			testInstance.add(a);
			spy.should.have.been.calledOnce;
		});
	});

	describe("remove", function() {
		it("should remove an element from a collection", function() {
			var a = new Omino.Model();
			a.set("prova",2);
			testInstance.add(a);
			testInstance.remove(a);
			testInstance.length().should.equal(0);
		});

		it("should trigger a remove event", function() {
			var a = new Omino.Model();
			a.set("prova",2);
			var spy = sinon.spy();
			testInstance.on("remove",spy);
			testInstance.add(a);
			testInstance.remove(a);
			spy.should.have.been.calledOnce;
		});		
	});

});