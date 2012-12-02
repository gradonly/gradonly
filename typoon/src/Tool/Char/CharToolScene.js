// CharToolScene
var TAG_CHARUILAYER = 777772;

var CharUILayer = cc.Layer.extend({
    m_window:null,
    m_winSize:null,
    names:null,
     unit:null,
    ctor:function () {
        this.m_winSize = cc.Director.getInstance().getWinSize();
        this.names = ["help", "move", "distort", "gather", "chop", "kick", "open"];
    },

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
        this.unit = gg.Unit.create();
        this.unit.setPosition(cc.p(200, 400));
        this.unit.setScale(5);
        this.addChild(this.unit);

        this.unit.setAnimation("help");
    },

    // Right is property of UI object Menu
    RightMenu:function() {
        var size = this.m_winSize;

        // animation button
        var menu = cc.Menu.create(null);
        menu.setPosition(cc.p(500, 600));
        this.addChild(menu, 1);

        var index = 0;
        
        for (var i = 0; i < 6; ++i) {
            var name = null;
            var label = cc.MenuItemFont.create(this.names[i], this, this.setAnimation);
            label.button_type = i;
            label.setPosition(cc.p(0, -50*i));
            menu.addChild(label);
        }

        //  keyboard input
        var keyboardDispatcher = new cc.KeyboardDispatcher.getInstance();
        keyboardDispatcher.addDelegate({
            onKeyUp:function(e){
                console.log(e);
                // Menu.method call.
                
                // in Menu. method 
                // child method가  키보드 이벤트가 필요하면 처리...
            },
            onKeyDown:function(e){
                console.log(e);
            }
        });
    },

    setAnimation:function(sender) {
        // console.log("call setAnimation");
        this.unit.setAnimation(this.names[sender.button_type]);
        var storage = gg.LocalStroageInstance();
        storage.save('char_animation', this.names[sender.button_type]);
        
    },
});

var CharToolScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var UILayer = new CharUILayer();
        this.addChild(UILayer, 1, TAG_CHARUILAYER);

    }
});
