Handlebars.registerHelper("boundEach", function(collection, options) {
	debugger;
	var ret = "",
		i = 0;
	if(_.isArray(collection)) {
		for(i = 0; i < collection.length; i++) {
			ret += options.fn(collection[i]);
		}
	} else {

		for(i = 0; i < collection.length; i++) {
			ret += options.fn(collection.at(i));
		}
	}
	return ret;

});