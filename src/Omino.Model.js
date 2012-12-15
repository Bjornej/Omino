
var Model = Omino.Model = function(attributes, options){
	this.attributes = {};
};

Model.extend = extend;

_.extend(Model.prototype, Omino.Events, {
	initialize : function(){},
	set: function(attribute,value){
		var currentValue = this.attributes[attribute];
		this.attributes[attribute] = value;
		if(value!==currentValue){
			this.trigger("change:"+attribute,value);
			this.trigger("change",value);
		}
	},

	get: function(attribute){
		return this.attributes[attribute];
	},

	unset: function(attribute){
		var value = this.attributes[attribute];
		delete this.attributes[attribute];
		if(value!==undefined){
			this.trigger("change:"+attribute,value);
			this.trigger("change",value);
		}
	}

});