
var gg = gg = gg || {};


// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

gg.LocalStorage = cc.Class.extend({
	ctor:function() {
		console.log("gg.LocalStorage.inner");
		this.storageDirty = new Array();
	},

	// normal object.
	save:function(key, value) {
		//console.log("save ---------------------------");
		localStorage.setItem(key, value);
		localStorage.setItem(key+"_dirty", true);

	},

	isDirty:function(key) {
		var rtvalue = (localStorage.getItem(key+"_dirty") == "true");
		return rtvalue;
	},

	load:function(key) {
		localStorage.setItem(key+"_dirty", false);
		return localStorage.getItem(key);
	},

	// --set
	add:function(key, value) {
		var item = this.get(key);
		if( item == null ) item = [];

		item.push(value);
		var encoded = JSONfn.stringify(item);
		localStorage.setItem(key, encoded);

	},

	set:function(key, value) {
		localStorage.setItem(key, JSONfn.stringify(value));
	},
	
	get:function(key) {
		var item = localStorage.getItem(key);
		var parsed = JSONfn.parse(item);
		return parsed;
	},

	modifyElementPosition:function(key, element) {
		var tag = element.tag;
		var items = JSONfn.parse(localStorage.getItem(key));

	//	console.log("modifyElementPosition---------------------------------------------------");

		for(x in items) {
		console.log(items);
		console.log("items ---" + items[x].tag + "  " + tag);
	//		console.log(items[x]);
	//		console.log(items[x].tag);
			if(items[x].tag == tag) {
				items[x].position = element.position;
				//console.log("element.position -------------------------------");
				//console.log(element.position);
			}
		}
		
		localStorage.setItem(key, JSONfn.stringify(items));
		localStorage.setItem(key+"_dirty", true);

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
		var rtObject = new Array();
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