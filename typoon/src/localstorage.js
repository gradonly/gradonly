
gg.LocalStorage = cc.Class.extend({
	ctor:function() {
		console.log("gg.LocalStorage.inner");

	},
	save:function(key, value) {
		localStorage.setItem(key, value);
	},

	load:function(key) {
		return localStorage[key];
	},

	add:function(key, value) {
		var item = this.get(key);
		if( item == null ) item = [];

		item.push(value);

		var encoded = JSON.stringify(item);

		localStorage.setItem(key, encoded);

	},

	get:function(key) {
		var item = localStorage.getItem(key);
		var parsed = JSON.parse(item);
		return parsed;
	},

	saveObject:function(key, value) {
		console.log(value);
		//localStorage.setItem(key, JSON.stringify(value));
		//var decycled = JSON.decycle(value);
		//var decycled = JSON.decycle( value );

		//localStorage.setItem(key, Cereal.stringify( value ) );
		//localStorage.setItem(key, JSON.stringify( decycled ) );
	},
	loadObject:function(key) {
		var rtObject = [];
		rtObject = localStorage.getItem(key);
		if( rtObject == null) {
			return null;
		}else{
			rtObject = JSON.parse(rtObject);
			return rtObject;
		}
	}
});

gg.LocalStorage._instance = null;
gg.LocalStorage.firstUse = true;


gg.LocalStroageInstance = function() {

	if( gg.LocalStorage.firstUse == true) {
		console.log("repeate instance");
		var m_instance = new gg.LocalStorage();
		gg.LocalStorage._instance = m_instance;
		gg.LocalStorage.firstUse = false;
	}
	
	return gg.LocalStorage._instance;
}

