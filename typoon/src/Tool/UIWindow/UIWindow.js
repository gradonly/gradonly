var TAG_UIWINDOW_LAYER = 1111111;
var UIWindowLayer = cc.Layer.extend({
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

 
    },

    LeftMenu:function () {
   
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
        var property_title = cc.LabelTTF.create("UIWindow Layer", "Arial", 12);
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

var UIWindow = cc.Scene.extend({
    onEnter:function () {
        this._super();

        //var MapLayer = new PlayMapLayer();
        //this.addChild(MapLayer, 0, TAG_LAYER_MAP);

        var UILayer = new UIWindowLayer();
        this.addChild(UILayer, 1, TAG_UIWINDOW_LAYER);

    }
});
