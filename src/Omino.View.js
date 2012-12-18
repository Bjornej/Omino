var View = Omino.View = function(){
	var el = "<" + this.tagName;
	if(this.className){el+= " class=\"" + this.className + "\"";}
	el += " />";
	this.el = el;
	this.$el = $(el);
	this.initialize();

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
	}
});

View.extend = extend;