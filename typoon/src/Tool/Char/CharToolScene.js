// CharToolScene
var TAG_CHARUILAYER = 777772;

var CharUILayer = cc.Layer.extend({
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

        return true;
    },

    TopMenu:function () {

    },

    LeftMenu:function () {
   
    },

    // Right is property of UI object Menu
    RightMenu:function() {
    
        var size = this.m_winSize;

        // property_title
        var property_title = cc.LabelTTF.create("Character Tool", "Arial", 12);
        property_title.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
        property_title.setColor(new cc.Color3B(255, 255, 255));
        this.addChild(property_title);

        console.log(property_title);

        
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
});

var CharToolScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var UILayer = new CharUILayer();
        this.addChild(UILayer, 1, TAG_CHARUILAYER);

    }
});
