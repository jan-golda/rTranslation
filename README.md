rTranslation
=======
Very simple translation module for Node.js

## Installation
```bash
npm install --save rtranslation
```
## Usage
### Setting up
To set up rTranslation you have to use this:
```js
GLOBAL.lang = require("rtranslation")(options);
```
Options object:
```js
var options = {
  //default language, not required but recommended
  language: "en_EN"
  //string to return if passed key is wrong, by defoult key will be returned
  wrong: "undefined"
}
```

### Loading translations
```js
lang.loadTranslationFromFile(file, callback);
lang.loadTranslationFromFileSync(file);
lang.loadTranslation(language, object, callback);
```
* __file__ - (String, required) path to file
* __language__ - (String, required) language of this translation
* __object__ - (Object, required) object with translation
* __callback(error)__ - (Function, required) callback, if everythink went fine error==null

### Getting translation
```js
lang.loadTranslation(key, language);
lang.t(key, language);
```
* __key__ - (String, required) key in format "aaa.bbb.ccc..."
* __language__ - (String, optional) if not set default language will be used

## Example
Using async module for loading multiple files
```js
var async = require('async');

GLOBAL.lang = require("rtranslation")({
	language: "pl_PL",
	wrong: "undefined"
});

async.map(['pl.json','en.json'], lang.loadTranslationFromFile, function(err){
	if(err) throw err;

	console.log(lang.translation);

	console.log(lang.t("test"));
	console.log(lang.t("test", "en_EN"));

	console.log(lang.t("a.b.c.d"));
	console.log(lang.t("a.b.c.d", "en_EN"));

	console.log(lang.t("a.b.text"));
	console.log(lang.t("a.b.text", "en_EN"));

	//wrong keys
	console.log("Wrong keys:");
	console.log(lang.t("z"));
	console.log(lang.t("a.somethink"));
	console.log(lang.t("a.b.text.d"));
	console.log(lang.t("a.b.c.d.e"));
	console.log(lang.t("a.b"));

});
```
