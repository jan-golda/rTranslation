var async = require('async');

GLOBAL.lang = require("../rTranslation")({
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