var gg = gg = gg || {};

gg.House = cc.Node.extend({
    menu:null,
    ctor:function () {
        this.menu = cc.Menu.create(null);
        this.menu.setPosition(cc.PointZero());
        this.addChild(this.menu, 0);
    },
    onEnter:function () {
    },
    build:function(type) {
        var item = cc.MenuItemImage.create(
            "res/uiitem/house/map_" + type + ".png",
            "res/uiitem/house/map_" + type + ".png",
            this,
            function () {
                // this.unit.setState(UNIT_STATE_BUILDING);
                // this.unit.setBuildingType(i);
            });

        this.menu.addChild(item, 0);
    },
});

gg.House.create = function (type) {
    var house = new gg.House();
    house.build(type);
    return house;
};
