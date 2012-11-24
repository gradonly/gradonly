var gg = gg = gg || {};

gg.House = cc.Node.extend({
    menu:null,
    ctor:function () {
    },
    onEnter:function () {
        this.menu = cc.Menu.create(null);
        this.menu.setPosition(cc.PointZero());
        this.addChild(this.menu, 0);
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

        item.setPosition(cc.p(400, 400));
        this.menu.addChild(item, 0);
    },
});

gg.House.create = function (type, position) {
    var house = new gg.House();
    house.build(type);
    house.setPosition(position);
    return house;
};
