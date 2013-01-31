var View = Omino.View = function(options) {
		this.setUpOptions(options);
		if(this.el === undefined) {
			var el = "<" + this.tagName;
			if(this.className) {
				el += " class=\"" + this.className + "\"";
			}
			el += " />";
			this.el = el;
		}
		this.$el = $(this.el);

		this.initialize(options);
		this.setUpEvents(options);
	};


var baseOptions = ["model", "collection", "el", "tagName", "className","modelEvents","collectionEvents","events"];

_.extend(View.prototype, Omino.Events, {

	tagName: "div",

	initialize: function() {},

	beforeRender: function() {},

	render: function() {
		this.trigger("before:render");
		this.beforeRender();
		this.$el.html(this.template(this.serializeData()));
		this.afterRender();
		this.trigger("after:render");
	},

	afterRender: function() {},

	serializeData: function() {
		var model = this.model.toJSON();
		model.options = this.options;
		return model;
	},


	setUpOptions: function(options) {
		this.options = {};
		_.assign(this, _.pick(options, baseOptions));
		_.assign(this.options, _.omit(options, baseOptions));
	},

	setUpEvents: function(options) {
		_.forOwn(this.modelEvents || {}, function(value, key) {
			if(_.isString(value)) {
				this.model.on(key, this[value], this);
			} else {
				this.model.on(key, value, this);
			}
		}, this);
		
		_.forOwn(this.collectionEvents || {}, function(value, key) {
			if(_.isString(value)) {
				this.collection.on(key, this[value], this);
			} else {
				this.collection.on(key, value, this);
			}
		}, this);

	}
});

View.extend = extend;