var Omino = {};

var extend = function(protoProps, staticProps) {
		var parent = this;
		var child;

		if(protoProps && _.has(protoProps, 'constructor')) {
			child = protoProps.constructor;
		} else {
			child = function() {
				parent.apply(this, arguments);
			};
		}

		_.extend(child, parent, staticProps);

		var Surrogate = function() {
				this.constructor = child;
			};
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate;

		if(protoProps) _.extend(child.prototype, protoProps);

		child.base = parent.prototype;

		return child;
	};