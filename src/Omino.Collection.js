var Collection = Omino.Collection = function(){
	this.models=[];
	return this;
};

Collection.extend = extend;

_.extend(Collection.prototype,Omino.Events,{
	add: function( element ){
		this.models.push(element);
		this.trigger("add",element);
	},

	remove:function(element){
		this.models = _.without(this.models,element);
		this.trigger("remove",element);
	},

	at:function(index){
		return this.models[index];
	},

	length : function(){
		return this.models.length;
	}

});