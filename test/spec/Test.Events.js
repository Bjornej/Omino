describe('Events', function() {
	describe('function on', function() {

		var testModel, testInstance;

		beforeEach(function() {
			testModel = function() {};
			_.extend(testModel.prototype, Omino.Events);
			testInstance = new testModel();
		});

		it('should attach a callback to event', function() {
			var listener = sinon.spy();
			testInstance.on("change", listener);
			testInstance.trigger("change");
			listener.should.have.been.calledOnce;
		});

		it('should attach a callback to multiple events', function() {
			var listener = sinon.spy();
			testInstance.on("change change2", listener);
			testInstance.trigger("change");
			testInstance.trigger("change2");
			listener.should.have.been.calledTwice;
		});


		it('should set context', function(done) {
			var that = this;
			testInstance.on("change", function() {
				if(this == that) {
					done();
				}
			}, that);
			testInstance.trigger("change");
		});
	});


	describe('function off', function() {

		var testModel, testInstance;

		beforeEach(function() {
			testModel = function() {};
			_.extend(testModel.prototype, Omino.Events);
			testInstance = new testModel();
		});

		it('should detach a callback from event', function() {
			var fail = sinon.spy();
			testInstance.on("change", fail);
			testInstance.off("change", fail);
			testInstance.trigger("change");
			fail.should.not.have.been.called;
		});

		it('should detach a callback from multple events', function() {
			var fail = sinon.spy();
			testInstance.on("change", fail);
			testInstance.on("change2", fail);
			testInstance.off("change change2", fail);
			testInstance.trigger("change");
			testInstance.trigger("change2");
			fail.should.not.have.been.called;
		});

	});


	describe('function trigger', function() {

		var testModel, testInstance;

		beforeEach(function() {
			testModel = function() {};
			_.extend(testModel.prototype, Omino.Events);
			testInstance = new testModel();
		});

		it('should trigger event', function() {
			var fail = sinon.spy();
			testInstance.on("change", fail);
			testInstance.trigger("change");
			fail.should.have.been.called;
		});

		it('should trigger multiple events', function() {
			var fail = sinon.spy();
			var fail2 = sinon.spy();
			testInstance.on("change", fail);
			testInstance.on("change2", fail2);
			testInstance.trigger("change change2");
			fail.should.have.been.called;
			fail2.should.have.been.called;
		});

	});


});