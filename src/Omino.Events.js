var Events = Omino.Events = {
	on: function(events,callback,context){
		var calls,event;
		events = events.split('\\s+');
		while(event = event.shift()){
			calls = this._callbacks[event] || [];
			calls.push({
				callback : callback,
				 context : context || this
			});
			this._callbacks[event]=calls;
		}
	},

	off: function(events,callback,context){
		var calls;
		if(!(calls=this._callbacks)){return;}

		if(!(events || callback||context)){
			delete this._callbacks;
			return this;
		}

		events = events.split('\\s+');
		while(event = events.shift()){
			if((calls = this._callbacks[event])!==undefined){
				this._callbacks[event]= _.filter(calls,function(value,index){
					return (value.callback===callback && (context!==undefined && value.context === context));
				});
			}
		}
	},

	trigger : function(events, parameters){
		events = events.split('\\s+');
		while(event = events.shift()){
			calls = this._callbacks[event] || [];
			_.forEach(calls, function(value,index){
				value.callback.apply(value.context || this,parameters);
			},this);
		}
	}
};