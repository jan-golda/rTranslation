// node.js modules
var fs		= require('fs');

// rTranslation class
function rTranslation(options){
	var lang = this;

	lang.options = options;
	lang.translation = {};

	// load translation form file
	lang.loadTranslationFromFile = function loadTranslationFromFile(file, callback){
		fs.readFile(file, function(err, data){
			// return IO errors
			if(err) return callback(err);

			// catch JSON parse errors
			try {
				data = JSON.parse(data);

				// load translation from loaded object
				lang.loadTranslation(data.language, data.translation, callback);
			}catch(err){
				return callback(err);
			}
		});
	};

	// load translation form file (sync)
	lang.loadTranslationFromFileSync = function loadTranslationFromFileSync(file){
		// load file
		var data = fs.readFileSync(file);

		// parse data
		data = JSON.parse(data);

		// load translation from loaded object
		lang.loadTranslation(data.language, data.translation);
	};

	// load translation from js object
	lang.loadTranslation = function loadTranslation(language, obj, callback){
		// create language if not exists
		if(!lang.translation[language])
			lang.translation[language] = {};

		// overwrite with new translation
		for(var attr in obj){
			lang.translation[language][attr] = obj[attr];
		}
		
		// callback if needed
		if(callback) callback(null);
	};

	// return translation
	lang.t = lang.getTranslation = function getTranslation(key, language){
		// get default language if needed
		language = language || lang.options.language;

		// catch wrong keys
		try{
			var split = key.split(".");
			var last = lang.translation[language];
			for(var i = 0; i<split.length; i++){
				last = last[split[i]];
			}

			// catch keys targeting to something unintresting
			if(typeof last === 'object' || typeof last === 'undefined')
				throw new Error("this key points to object or undefined");	

			// return rtanslation parsed to string
			return ''+last;
		}catch(e){
			// return wrong identificator
			return lang.options.wrong || key;
		}
	}
}

// node.js module export
module.exports = function(options){
	options = options || {};

	return new rTranslation(options);
};