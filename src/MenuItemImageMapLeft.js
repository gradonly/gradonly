var MenuItemImageMapLeft = cc.MenuItemImage.extend({
    type:0,
    create:null,
	ctor:function () {
        this.setTouchEnabled(true);
    },
    setType:function(type) {
    	this.type = type;
    },
    getType:function(type) {
    	return type;
    },
});

MenuItemImageMapLeft.create = function (normalImage, selectedImage, three, four, five) {
	var ret = new MenuItemImageMapLeft();

    if (arguments.length == 0) {
        if (ret.initWithNormalImage(null, null, null, null, null) == false) {
        	retuirn null;
        }
    }
    else if (arguments.length == 4) {
        if (ret.initWithNormalImage(normalImage, selectedImage, null, three, four) == false) {
        	return null;
        }
    }
    else {
    	if (ret.initWithNormalImage(normalImage, selectedImage, three, four, five) == false) {
    		return null;
    	}
    }

    return ret;
};
