
var Model = Omino.Model = function(attributes, options){
	var that=this;
	this.attributes = {};
	this.cid = _.uniqueId("m");
	this.setUpComputedProperties();
	_.forOwn(this.defaults,function(value,key){
		that.set(key,value);
	});
};

Model.extend = extend;

_.extend(Model.prototype, Omino.Events, {
	initialize : function(){},

	defaults : {},

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

	setUpComputedProperties: function(){
		_.forOwn(this.computedProperties || {}, function(value,key){
	 		var program;
			if(_.isString(value)){
				program=this[value];
			}else{
				program=value;
			}

			var properties = program.toString().match(/".*?"/g);
						program = _.bind(program,this);
			properties = _.map(properties, function(element){return element.replace("\"","").replace("\"","");})
			for(var i = 0;i< properties.length;i++){
				this.on("change:"+properties[i],function(){ this.set(key,program());},this);
			}

		}, this);
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