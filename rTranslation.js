var fs		= require('fs');

function rTranslation(options){
	var _this = this;

	this.options = options;
	this.translation = {};

	this.loadTranslationFromFile = function loadTranslationFromFile(file, callback) {
		fs.readFile(file, function(err, data){
			if(err) return callback(err);

			try {
				data = JSON.parse(data);
				_this.loadTranslation(data.language, data.translation, callback);
			}catch(err){
				return callback(err);
			}
		});
	};

	this.loadTranslation = function loadTranslation(lang, obj, callback) {
		if(!_this.translation[lang])_this.translation[lang] = {};

		for(var attr in obj){
			_this.translation[lang][attr] = obj[attr];
		}

		return callback(null);
	};

	this.t = this.getTranslation = function getTranslation(key, lang){
		lang = lang || _this.options.language;

		try{
			var split = key.split(".");
			var last = _this.translation[lang];
			for(var i = 0; i<split.length; i++){
				last = last[split[i]];
			}

			if(typeof last === 'object' || typeof last === 'undefined')
				throw "this key points to object or undefined";

			return ''+last;
		}catch(e){
			return this.options.wrong || key;
		}
	}
}

module.exports = function(options){
	options = options || {};

	return new rTranslation(options);
};