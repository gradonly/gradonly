
var MainMenuLayer = cc.Layer.extend({
    init:function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        var bg = cc.Sprite.create("res/MainMenuScene/bg.png");
        bg.setPosition(new cc.p(size.width / 2, size.height / 2));
        this.addChild(bg, 0);

        var information = cc.Sprite.create("res/MainMenuScene/welback.png");
        information.setAnchorPoint(cc.p(0.5, 0.5));
        information.setPosition(cc.p(size.width * 0.5, size.height * 0.45));
        this.addChild(information, 0);

        var id = cc.LabelTTF.create("I Love You", "Arial", 30);
        id.setPosition(cc.p(size.width * 0.5 + 25, size.height * 0.45 + 10));
        id.setColor(new cc.Color3B(0, 0, 0));
        this.addChild(id, 5);

        var nickname = cc.LabelTTF.create("Joonseok", "Arial", 30);
        nickname.setPosition(cc.p(size.width * 0.5 + 25, size.height * 0.45 - 38));
        nickname.setColor(new cc.Color3B(0, 0, 0));
        this.addChild(nickname, 5);

        var item = cc.MenuItemImage.create(
            'res/MainMenuScene/UIPlay.png',
            'res/MainMenuScene/UIPlaySelected.png',
            this,
            function () {
                var director = cc.Director.getInstance();
                director.replaceScene(new PlayScene);
            });
        item.setPosition(cc.p(size.width * 0.5, size.height * 0.3));
        var menu = cc.Menu.create(item);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);
        return true;
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        console.log("MainMenu Scene Loaded ------------------------");
        var layer = new MainMenuLayer();
        this.addChild(layer);
        layer.init();
    }
});
