var View = Omino.View = function(){
	var el = "<" + this.tagName;
	if(this.className){el+= " class=\"" + this.className + "\"";}
	el += " />";
	this.el = el;
	this.$el = $(el);
};

_.extend(View.prototype, Omino.Events, {

	tagName : "div",

	render : function(){
		this.trigger("before:render");
		this.$el.html(this.template(this.serializeData()));
		this.trigger("after:render");
	},

	serializeData : function(){
		var model = this.model.toJSON();
		model.options = this.options;
		return model;
	}
});

View.extend = extend;