
var gg = gg = gg || {};

gg.LocalStorage = cc.Class.extend({
	_instance:null,
	ctor:function() {
		console.log("gg.LocalStorage.inner");
		this.storageDirty = new Array();
	},
	save:function(key, value) {
		//console.log("save ---------------------------");
		localStorage.setItem(key, value);
		localStorage.setItem(key+"_dirty", true);

		//this.dirty["key"] = true;
		//console.log("save :function");
		//console.log(this);
	},

	isDirty:function(key) {
		// console.log("isDirty" + key+"_dirty");
		// console.log(localStorage.getItem(key+"_dirty"));
		var rtvalue = (localStorage.getItem(key+"_dirty") == "true");
		// console.log(rtvalue);
		return rtvalue;
	},

	load:function(key) {
		localStorage.setItem(key+"_dirty", false);
		return localStorage.getItem(key);
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



gg.LocalStorage.getInstance = function() {

	if( gg.firstUseLocalStorage == true) {
		gg.firstUseLocalStorage = false;
		console.log("repeate instance");
		var m_instance = new gg.LocalStorage();
		gg.sharedLocalStorage = m_instance;
	}
	
	return gg.sharedLocalStorage;
};


gg.firstUseLocalStorage = true;
gg.sharedLocalStorage = null;