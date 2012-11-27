// Extend
// cc.Extend()
// ctor ( 생성자 )
// _super ( 부모 객체를 부르는 포인터 )


// 사용자 네임스페이스 분리 -------------
var gg = gg || {};

gg.MenuItemImageMapLeft = cc.MenuItemImage.extend({
	ctor: function() {
		console.log("gg.MenuItemImageMapLeft()");
	}
});
// ------------------

//  var item2 = new cc.MenuItemImageMapLeft();
cc.MenuItemImageMapLeft = cc.MenuItemImage.extend({
	ctor: function() {
		console.log("cc.MenuItemImageMapLeft()");
	}
});

// MenuItemImageMapLeft()
var MenuItemImageMapLeft = cc.MenuItemImage.extend({
	ctor: function() {
		console.log("var MenuItemImage()");
	}
});
