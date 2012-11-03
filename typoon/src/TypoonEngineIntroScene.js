var TypoonEngineIntroLayer = cc.Layer.extend({
    init:function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        var menu = cc.Menu.create(null);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);

        var item = null;
        item = cc.MenuItemImage.create(
            'res/MainMenuScene/UIPlay.png',
            'res/MainMenuScene/UIPlaySelected.png',
            this,
            function () {
                var director = cc.Director.getInstance();
                director.replaceScene(new MapToolScene);
            });
        item.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
        menu.addChild(item);

        item = cc.MenuItemImage.create(
            'res/MainMenuScene/UIPlay.png',
            'res/MainMenuScene/UIPlaySelected.png',
            this,
            function () {
                var director = cc.Director.getInstance();
                director.replaceScene(new MainMenuScene);
            });
        item.setPosition(cc.p(size.width * 0.5, size.height * 0.3));
        menu.addChild(item);

        return true;
    }
});

var TypoonEngineIntroScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TypoonEngineIntroLayer();
        this.addChild(layer);
        layer.init();
    }
});
