// CharToolScene
var TAG_CHARUILAYER = 777772;

var CharUILayer = cc.Layer.extend({
    m_window:null,
    m_winSize:null,
    names:null,
    man:null,
    women:null,
    ctor:function () {
        this.m_winSize = cc.Director.getInstance().getWinSize();
        this.names = ["help", "move", "distort", "gather", "chop", "kick", "open"];    },

    onEnter:function () {
        this._super();

        this.TopMenu();

        this.ShowCharacter();

        this.RightMenu();

        return true;
    },

    TopMenu:function () {

    },

    ShowCharacter:function () {
        this.man = gg.Unit.create("man");
        this.man.setPosition(cc.p(200, 400));
        this.man.setScale(5);
        this.addChild(this.man);

        this.man.setAnimation("help");

        this.women = gg.Unit.create("women");
        this.women.setPosition(cc.p(600, 400));
        this.women.setScale(5);
        this.addChild(this.women);
        this.women.setAnimation("help");
    },

    // Right is property of UI object Menu
    RightMenu:function() {
        var size = this.m_winSize;

        // animation button
        var menu = cc.Menu.create(null);
        menu.setPosition(cc.p(300, 600));
        this.addChild(menu, 1);

        var index = 0;
        
        for (var i = 0; i < 6; ++i) {
            var name = null;
            var label = cc.MenuItemFont.create(this.names[i], this, this.setAnimation);
            label.button_type = i;
            label.setPosition(cc.p(0, -50*i));
            menu.addChild(label);
            label.sex = "man";
        }

        for (var i = 0; i < 6; ++i) {
            var name = null;
            var label = cc.MenuItemFont.create(this.names[i], this, this.setAnimation);
            label.button_type = i;
            label.setPosition(cc.p(400, -50*i));
            menu.addChild(label);
            label.sex = "women";
        }

        // //  keyboard input
        // var keyboardDispatcher = new cc.KeyboardDispatcher.getInstance();
        // keyboardDispatcher.addDelegate({
        //     onKeyUp:function(e){
        //     },
        //     onKeyDown:function(e){
        //         console.log(e);
        //     }
        // });
    },

    setAnimation:function(sender) {
        var item = sender;

        console.log(item.sex);
        var unit = null;
        if (item.sex == "man") {
            unit = this.man;
        } else {
            unit = this.women;
        }
        unit.setAnimation(this.names[sender.button_type]);

        var storage = gg.LocalStorage.getInstance();
        storage.save('char_animation', this.names[item.button_type]);
    },
});

var CharToolScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var UILayer = new CharUILayer();
        this.addChild(UILayer, 1, TAG_CHARUILAYER);
    }
});
