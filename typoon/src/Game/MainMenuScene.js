/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

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

        var id = cc.LabelTTF.create("mtoto1004", "Arial", 30);
        id.setPosition(cc.p(size.width * 0.5 + 25, size.height * 0.45 + 10));
        id.setColor(new cc.Color3B(0, 0, 0));
        this.addChild(id, 5);

        var nickname = cc.LabelTTF.create("joonseok", "Arial", 30);
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

        var menu = cc.Menu.create(item, null);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);
        
        return true;
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
        layer.init();
    }
});
