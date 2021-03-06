var gg = gg = gg || {};

gg.House = cc.Node.extend({
    menu:null,
    sprite1:null,
    sprite2:null,
    type:0,
    bar:null,
    ctor:function () {
        this.menu = cc.Menu.create(null);
        this.menu.setPosition(cc.PointZero());
        this.addChild(this.menu, 0);
    },
    onEnter:function () {
        this._super();
    },
    build:function(type) {
        this.type = type;
        actions = [];
        this.sprite1 = cc.Sprite.create("res/uiitem/house/building_0.png");
        this.sprite1.setPosition(cc.PointZero());
        this.addChild(this.sprite1);

        this.sprite2 = cc.Sprite.create("res/uiitem/house/building_1.png");
        this.sprite2.setPosition(cc.p(0, 30));
        this.addChild(this.sprite2);
        this.sprite2.setVisible(false);

        var delay1 = cc.DelayTime.create(5.0);
        var call1 = cc.CallFunc.create(this, this.createBuild);
        var delay2 = cc.DelayTime.create(5.0);
        var call2 = cc.CallFunc.create(this, this.createButton, 1);

        actions.push(delay1);
        actions.push(call1);
        actions.push(delay2);
        actions.push(call2);

        var sequence = cc.Sequence.create(actions);
        this.runAction(sequence);

        this.bar = cc.Sprite.create("res/uiitem/store_greenbutton.png");
        this.bar.setAnchorPoint(cc.p(0.0, 0.5));
        this.bar.setScaleX(0);
        this.bar.setPosition(cc.p(-50, 100));
        this.addChild(this.bar);
        
        var actions2 = [];
        var scale = cc.ScaleTo.create(10, 1, 1);
        var hidebar = cc.CallFunc.create(this, this.hideBar);
        actions2.push(scale);
        actions2.push(hidebar);
        var sequence2 = cc.Sequence.create(actions2);
        this.bar.runAction(sequence2);
    },
    createBuild:function(sender) {
        this.sprite1.setVisible(false);
        this.sprite2.setVisible(true);
    },
    createButton:function(sender) {
        this.sprite2.setVisible(false);
        console.log(this.type);
        var item = cc.MenuItemImage.create(
            "res/uiitem/house/map_" + this.type + ".png",
            "res/uiitem/house/map_" + this.type + ".png",
            this,
            function () {
                // this.unit.setState(UNIT_STATE_BUILDING);
                // this.unit.setBuildingType(i);
            });

        this.menu.addChild(item, 1);
    },

    hideBar:function() {
        this.bar.setVisible(false);
    }
});

gg.House.create = function (type) {
    var house = new gg.House();
    house.build(type);
    return house;
};
