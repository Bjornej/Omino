var View = Omino.View = function(options){
	this.setUpOptions(options);
	if(this.el===undefined){
		var el = "<" + this.tagName;
		if(this.className){el+= " class=\"" + this.className + "\"";}
		el += " />";
		this.el = el;
	}
	this.$el = $(this.el);

	this.initialize(options);

};

_.extend(View.prototype, Omino.Events, {

	tagName : "div",

	initialize : function(){},

	beforeRender : function(){},

	render : function(){
		this.trigger("before:render");
		this.beforeRender();
		this.$el.html(this.template(this.serializeData()));
		this.afterRender();
		this.trigger("after:render");
	},

	afterRender : function(){},

	serializeData : function(){
		var model = this.model.toJSON();
		model.options = this.options;
		return model;
	},


	setUpOptions: function(options){
		this.options={};
		_.assign(this,_.pick(options,["model","collection","el","tagName","className"]));
		_.assign(this.options,_.omit(options,["model","collection","el","tagName","className"]));
	}
});

View.extend = extend;