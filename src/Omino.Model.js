
var Model = Omino.Model = function(attributes, options){
	this.attributes = {};
};

Model.extend = function(parameters){
	return _.extend(parameters, Model.prototype);
};

_.extend(Model.prototype, Omino.Events, {
	initialize : function(){},
	set: function(attribute,value){
		var currentValue = this.attributes[attribute];
		this.attributes[attribute] = value;
		if(value!==currentValue){
			this.trigger("change");
		}
	},

	get: function(attribute){
		return this.attributes[attribute];
	}

});