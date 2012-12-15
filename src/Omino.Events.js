var Events = Omino.Events = {
	on: function(events, callback, context) {
		var calls;
		events = events.split(/\s+/);
		if(!this._callbacks) {
			this._callbacks = {};
		}
		_.forEach(events, function(event, index) {
			calls = this._callbacks[event] || [];
			calls.push({
				callback: callback,
				context: context || this
			});
			this._callbacks[event] = calls;
		}, this);
	},

	off: function(events, callback, context) {
		var calls;
		if(!(calls = this._callbacks)) {
			return;
		}

		if(!(events || callback || context)) {
			delete this._callbacks;
			return this;
		}

		events = events.split(/\s+/);
		while(event = events.shift()) {
			if((calls = this._callbacks[event]) !== undefined) {
				this._callbacks[event] = _.filter(calls, function(value, index) {
					return(value.callback === callback && (context !== undefined && value.context === context));
				});
			}
		}
	},

	trigger: function(events, parameters) {
		var calls,allCalls;
		events = events.split(/\s+/);
		allCalls = this._callbacks || [];
		debugger;
		while(event = events.shift()) {
			calls = allCalls[event] || [];
			_.forEach(calls, function(value, index) {
				value.callback.call(value.context || this, parameters);
			}, this);
		}
	}
};