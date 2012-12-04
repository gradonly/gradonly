
var TAG_UIPLACEMENT_LAYER = 1134343;
var TAG_UIPLACEMENTMENU_LAYER = 234343213;
var TAG_UICOMPONENT_DATA = "uicomponent";
var TAG_MENUCONTAINER = "menucontainer";
var TAG_MENU2 = "level2";


gg.UIPlacementMenuLayer = cc.Layer.extend({
    menu:null,
    ctor:function () {
          this.setTouchEnabled(true);
    },
    onEnter:function () {
        this._super();

        var menu = cc.Menu.create(null);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1, TAG_MENUCONTAINER);
        this.TopMenu(menu);
        this.createHouseUI(menu);
        this.saveMenuItem();
        this.loadMenuItem(menu);

        this.menu = menu;

        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, false);

        return true;
    },

    saveMenuItemFromNode:function(node){
        if( node == null) 
        {
            console.log("saveMenuItemFromNode- node : null");
            return;
        }
        var instance = gg.LocalStorage.getInstance();
        var item = {
            tag : node.getTag(),
            calle : node.calle,
            res1 : node.res1,
            res2 : node.res2,
            position : node.getPosition(),
            func : node.func,
            visible : node.visible
        };

        // modify object
        instance.modifyElementPosition(TAG_UICOMPONENT_DATA, item);

       // instance.add(TAG_UICOMPONENT_DATA, item);

    },

    saveMenuItem:function(){
        var size = cc.Director.getInstance().getWinSize();
        var instance = gg.LocalStorage.getInstance();
        var items = [];

        // saved 
        var item = {
            tag: "level1",                                      // identity
            calle: "window1",                                    // calle when click.
            res1: "res/PlayScene/top_lvexp00.png",
            res2: "res/PlayScene/top_lvexp00.png",
            position: cc.p(size.width*0.1, size.height * 0.93),
            func: function(self){
                console.log(this);
                console.log(self);
                console.log('level_item is called!!!!!!!!!!');
                // console.log(this);
                // console.log(self);

                //find calle
                var level = this.getChildByTag(self.calle);
                if( level.isVisible() == true)
                    level.setVisible(false);
                else
                    level.setVisible(true);

                this.selectedNode = self;
            },
            visible: true
        };

        items.push(item);
        //instance.add(TAG_UICOMPONENT_DATA, item);

        var item = { 
            tag: "level2",
            res1: "res/PlayScene/top_coin.png",
            res2: "res/PlayScene/top_coin_p.png",
            position: cc.p(size.width*0.28, size.height * 0.93),
            func: function(self){
                console.log('level_item2 is called!!!!!!!!!!');
                this.selectedNode = self;
            },
            visible: true
        };

        items.push(item);
        //instance.add(TAG_UICOMPONENT_DATA, item);

        var item = { 
            tag: "level3",
            res1: "res/PlayScene/top_cash.png",
            res2: "res/PlayScene/top_cash_p.png",
            position: cc.p(size.width*0.45, size.height * 0.93),
            func: function(self){
                console.log('level_item3 is called!!!!!!!!!!');
                this.selectedNode = self;
            },
            visible: true
        };

        items.push(item);

        var item = {
            tag: "level4",
            res1: "res/PlayScene/top_pop.png",
            res2: "res/PlayScene/top_pop_p.png",
            position: cc.p(size.width*0.75, size.height * 0.93),
            func: function(self){
                console.log('level_item4 is called!!!!!!!!!!');
                this.selectedNode = self;
            },
            visible: true
        };

        items.push(item);

        var item = { 
            tag: "level5",
            res1: "res/PlayScene/top_sp.png",
            res2: "res/PlayScene/top_sp_p.png",
            position: cc.p(size.width*0.9, size.height * 0.93),
            func: function(self){
                console.log('level_item5 is called!!!!!!!!!!');
                this.selectedNode = self;
            },
            visible: true
        };

        
        items.push(item);

        var item = { 
            tag: "window1",
            res1: "res/MainMenuScene/welback.png",
            res2: "res/MainMenuScene/welback.png",
            position: cc.p(size.width/2, size.height/2),
            func: function(self){
                console.log('welback is called!!!!!!!!!!');
                this.selectedNode = self;
            },
            visible: false
        };


        items.push(item);

        instance.set(TAG_UICOMPONENT_DATA, items);

    },

    // loadMenu
    loadMenuItem:function(menu)
    {
        var instance = gg.LocalStorage.getInstance();
        var items = instance.get('uicomponent');
        console.log("items-----------------");
        console.log(items.length);
        for(var i = 0; i < items.length; i++) {
            var menuElement = items[i];
            this.makeMenuItem(menu, menuElement);
        }
    },

    // makeMenuItem
    makeMenuItem:function(menu, menuElement) {

        var tag = menuElement.tag;
        var calle = menuElement.calle;
        var res1 = menuElement.res1;
        var res2 = menuElement.res2;
        var func = menuElement.func;
        var position = menuElement.position;
        var visible = menuElement.visible;
        // Menu Item Spec.
        // image res1
        // image res2
        // function
        // position

        var size = cc.Director.getInstance().getWinSize();

        var Item = cc.MenuItemImage.create(
            res1,
            res2,
            menu,                           // parent's
            func
        );

        Item.setAnchorPoint(cc.p(0.5, 0.5));
        Item.setPosition(position);
        Item.setVisible(visible);
        Item.setTag(tag);
        Item.calle = calle;
        
        console.log("tag --------------------");
        console.log(tag);

        menu.addChild(Item);

    },

    TopMenu:function (menu) {

        

        // var size = cc.Director.getInstance().getWinSize();
        // var LevelItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_lvexp00.png",
        //     "res/PlayScene/top_lvexp00.png",
        //     this,
        //     function () {
        //     });
        // LevelItem.setAnchorPoint(cc.p(0.5, 0.5));
        // LevelItem.setPosition(cc.p(size.width * 0.1, size.height * 0.93));
        // menu.addChild(LevelItem);

        // var CoinItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_coin.png",
        //     "res/PlayScene/top_coin_p.png",
        //     this,
        //     function () {
        //     });
        // CoinItem.setAnchorPoint(cc.p(0.5, 0.5));
        // CoinItem.setPosition(cc.p(size.width * 0.28, size.height * 0.93));
        // menu.addChild(CoinItem);

        // var CashItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_cash.png",
        //     "res/PlayScene/top_cash_p.png",
        //     this,
        //     function () {
        //         console.log('dd');
        //     });
        // CashItem.setAnchorPoint(cc.p(0.5, 0.5));
        // CashItem.setPosition(cc.p(size.width * 0.45, size.height * 0.93));
        // menu.addChild(CashItem);

        // var PopItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_pop.png",
        //     "res/PlayScene/top_pop_p.png",
        //     this,
        //     function () {
        //     });
        // PopItem.setAnchorPoint(cc.p(0.5, 0.5));
        // PopItem.setPosition(cc.p(size.width * 0.75, size.height * 0.93));
        // menu.addChild(PopItem);

        // var PopItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_sp.png",
        //     "res/PlayScene/top_sp_p.png",
        //     this,
        //     function () {
        //     });
        // PopItem.setAnchorPoint(cc.p(0.5, 0.5));
        // PopItem.setPosition(cc.p(size.width * 0.9, size.height * 0.93));
        // menu.addChild(PopItem);
    },
    createHouseUI:function(menu) {
        var frame = cc.Sprite.create("res/uiitem/house/frame.png");
        frame.setPosition(cc.p(400, 100));
        this.addChild(frame, 0);

        for (var i = 0; i < 5; ++i) {
            var item = cc.MenuItemImage.create(
            "res/uiitem/house/map_" + i + ".png",
            null,
            this,
            function () {
                var layer = this.getParent().getChildByTag(TAG_LAYER_MAP);
                var unit = layer.getUnit();

                unit.setState(UNIT_STATE_BUILDING);
                unit.setBuilding(i);
            });

            item.setPosition(cc.p(160+120*i, 100));
            menu.addChild(item);
        }
    },

    registerWithTouchDispatcher:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 10, false);
    },

    onTouchBegan:function (touch, event) {
        var touchLocation = touch.getLocation();
        
        return true;
    },
    onTouchMoved:function (touch, event) {
        var touchLocation = touch.getLocation();
        console.log("move operation!~~~~~~~~~~~~");
        console.log(this.menu.selectedNode);
            if( this.menu.selectedNode != null) {
                this.menu.selectedNode.setPosition(touchLocation.x, touchLocation.y);
            }
        
    },
    onTouchEnded:function (touch, event) {
       this.saveMenuItemFromNode(this.menu.selectedNode);
       console.log("onTouchEnded----------------------------");
       this.menu.selectedNode = null;
    },
});

gg.PropertyWindow = cc.Layer.extend({
    ctor:function(){
       // this.setAnchorPoint(cc.p(0,0));
    },
    onEnter:function(){
        this._super();
        // tag
        // calle
        // text
        // res1
        // res2
        // func
        // visible

        
        
        
     
    },

});
var UIPlacement = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var UIPlacementMenuLayer = new gg.UIPlacementMenuLayer();
       // var PropertyWindow = new gg.PropertyWindow();

        // var tagText = new gg.TextFieldTTFDefault("<insert input tag>", cc.p(300,100));
        // this.addChild(tagText);
        // tagText.setPosition(cc.p(0, 100));

        // var tagText = new gg.TextFieldTTFDefault("<insert input calle>", cc.p(300,120));
        // this.addChild(tagText);
        // tagText.setPosition(cc.p(0, 120));
        

        this.addChild(UIPlacementMenuLayer, 0, TAG_UIPLACEMENTMENU_LAYER);
        //this.addChild(PropertyWindow,1);
    }
});
