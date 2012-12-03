var TAG_UICOMPONENT_LAYER = 1234332;
var TAG_UICOMPONENTMENU_LAYER = 2343433;

gg.UIComponentLayer = cc.Layer.extend({
    m_window:null,
    m_winSize:null,

    ctor:function () {
        this.m_winSize = cc.Director.getInstance().getWinSize();
    },
    onEnter:function () {
        this._super();

        this.TopMenu();
        this.LeftMenu();
        this.RightMenu();

        // this.m_window = new gg.UIWindow();
        // this.m_window.setPosition(cc.p(this.m_winSize.width/2,this.m_winSize.height/2));
        // this.addChild(this.m_window);

        return true;
    },
    TopMenu:function () {

        // var size = cc.Director.getInstance().getWinSize();

        // var menu = cc.Menu.create(null);
        // menu.setPosition(cc.PointZero());
        // this.addChild(menu, 1);

        // var LevelItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_lvexp00.png",        // normal image
        //     "res/PlayScene/top_lvexp00.png",        // selected images
        //     this,                                   // disabled image or target
        //     function () {                           // callback method
        //         console.log(this);
        //         console.log(LevelItem);
        //         console.log(LevelItem.getPosition());
        //     });

        // //console.log(LevelItem);
        // LevelItem.setAnchorPoint(cc.p(0.5, 0.5));
        // LevelItem.setPosition(cc.p(size.width * 0.1, size.height * 0.93));
        // //LevelItem.setTouchEnabled(true);
        // //LevelItem.registerWithTouchDispatcher(function(){ console.log(this) });

        // menu.addChild(LevelItem);

        // // coinItem
        // var CoinItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_coin.png",
        //     "res/PlayScene/top_coin_p.png",
        //     this,
        //     function () {
        //     });
        // CoinItem.setAnchorPoint(cc.p(0.5, 0.5));
        // CoinItem.setPosition(cc.p(size.width * 0.28, size.height * 0.93));
        // menu.addChild(CoinItem);

        // // cashItem
        // var CashItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_cash.png",
        //     "res/PlayScene/top_cash_p.png",
        //     this,
        //     function () {
        //     });
        // CashItem.setAnchorPoint(cc.p(0.5, 0.5));
        // CashItem.setPosition(cc.p(size.width * 0.45, size.height * 0.93));
        // menu.addChild(CashItem);

        // // popItem
        // var PopItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_pop.png",
        //     "res/PlayScene/top_pop_p.png",
        //     this,
        //     function () {
        //     });
        // PopItem.setAnchorPoint(cc.p(0.5, 0.5));
        // PopItem.setPosition(cc.p(size.width * 0.75, size.height * 0.93));
        // menu.addChild(PopItem);

        // var jwelItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_sp.png",
        //     "res/PlayScene/top_sp_p.png",
        //     this,
        //     function () {
        //     });
        // jwelItem.setAnchorPoint(cc.p(0.5, 0.5));
        // jwelItem.setPosition(cc.p(size.width * 0.9, size.height * 0.93));
        // menu.addChild(jwelItem);
    },

    LeftMenu:function () {
        // var menu = cc.Menu.create();
        // menu.setPosition(cc.p(100, 500));
        // this.addChild(menu);

        // var item_number = 9;
        // var path = "res/UIItem/";
        // for (var i = 0; i < item_number; ++i) {
        //     var file = path + "UI" + i + ".png";
        //     var item = cc.MenuItemImage.create(file, file, null, this, this.SelectMenuLeftItem);
        //     console.log(item);
        //     console.log(item.getContentSize());
        //     var itemHeight = item.getContentSize().height
        //     item.setAnchorPoint(0.5, 0.5);
        //     item.buttonType = i+1;
        //     item.setPosition(0, i*(-itemHeight));
        //     menu.addChild(item);
        // }
    },

    // Right is property of UI object Menu
    RightMenu:function() {
        var size = cc.Director.getInstance().getWinSize();
        console.log("size width" + size.width + " size height" + size.height);

        // cc.canvas.addEventListener("keydown", function(e) {
        //     cc.keyboardDispatcher.dispatchKeyboardMSG(e, true);
        //     //cc.IMED

        // })
        
        var textbox = cc.TextFieldTTF.create("<click here for input>", cc.size(100,50), cc.Text_ALIGNMENT_LEFT,"Arial", 32);
        textbox.setPosition(new cc.p(100,100));
        textbox.setColor(new cc.Color3B(255,255,255));
        textbox.setColorSpaceHolder(new cc.Color3B(255,255,255));
        textbox.insertText("ssss",4);
        textbox.attachWithIME();
        
        this.addChild(textbox);

        // property_title
        var property_title = cc.LabelTTF.create("UI Component Layer", "Arial", 12);
        property_title.setPosition(cc.p(size.width * 0.5 + 25, size.height * 0.45 - 38));
        property_title.setColor(new cc.Color3B(255, 255, 255));
        this.addChild(property_title);

        console.log(property_title);

        
        //  keyboard input
        // var keyboardDispatcher = new cc.KeyboardDispatcher.getInstance();
        // keyboardDispatcher.addDelegate({
        //     onKeyUp:function(e){
        //         console.log(e);
        //         // Menu.method call.
                
        //         // in Menu. method 
        //         // child method가  키보드 이벤트가 필요하면 처리...
        //     },
        //     onKeyDown:function(e){
        //         console.log(e);
        //     }
        // });
    },

    SelectMenuLeftItem:function (sender) {
        console.log(tile_button);
        map_layer = this.getParent().getChildByTag(TAG_LAYER_MAP);
        map_layer.getButtonType(sender.buttonType);
    },
});

gg.UIComponentMenuLayer = cc.Layer.extend({
    ctor:function () {
    },
    onEnter:function () {
        this._super();

        var menu = cc.Menu.create(null);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);

        this.TopMenu(menu);
        return true;
    },
    TopMenu:function (menu) {
        var size = cc.Director.getInstance().getWinSize();
        var LevelItem = cc.MenuItemImage.create(
            "res/PlayScene/top_lvexp00.png",
            "res/PlayScene/top_lvexp00.png",
            this,
            function () {
            });
        LevelItem.setAnchorPoint(cc.p(0.5, 0.5));
        LevelItem.setPosition(cc.p(size.width * 0.1, size.height * 0.93));
        menu.addChild(LevelItem);

        var CoinItem = cc.MenuItemImage.create(
            "res/PlayScene/top_coin.png",
            "res/PlayScene/top_coin_p.png",
            this,
            function () {
            });
        CoinItem.setAnchorPoint(cc.p(0.5, 0.5));
        CoinItem.setPosition(cc.p(size.width * 0.28, size.height * 0.93));
        menu.addChild(CoinItem);

        var CashItem = cc.MenuItemImage.create(
            "res/PlayScene/top_cash.png",
            "res/PlayScene/top_cash_p.png",
            this,
            function () {
                console.log('dd');
            });
        CashItem.setAnchorPoint(cc.p(0.5, 0.5));
        CashItem.setPosition(cc.p(size.width * 0.45, size.height * 0.93));
        menu.addChild(CashItem);

        var PopItem = cc.MenuItemImage.create(
            "res/PlayScene/top_pop.png",
            "res/PlayScene/top_pop_p.png",
            this,
            function () {
            });
        PopItem.setAnchorPoint(cc.p(0.5, 0.5));
        PopItem.setPosition(cc.p(size.width * 0.75, size.height * 0.93));
        menu.addChild(PopItem);

        var PopItem = cc.MenuItemImage.create(
            "res/PlayScene/top_sp.png",
            "res/PlayScene/top_sp_p.png",
            this,
            function () {
            });
        PopItem.setAnchorPoint(cc.p(0.5, 0.5));
        PopItem.setPosition(cc.p(size.width * 0.9, size.height * 0.93));
        menu.addChild(PopItem);
    },
});

var UIComponent = cc.Scene.extend({
    onEnter:function () {
        this._super();

        //var MapLayer = new PlayMapLayer();
        //this.addChild(MapLayer, 0, TAG_LAYER_MAP);

        var UILayer = new gg.UIComponentLayer();
        var UIComponentMenuLayer = new gg.UIComponentMenuLayer();

        this.addChild(UILayer, 1, TAG_UICOMPONENT_LAYER);
        this.addChild(UIComponentMenuLayer, 1, TAG_UICOMPONENTMENU_LAYER);

    }
});
