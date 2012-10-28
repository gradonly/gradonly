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

var TAG_TILE_MAP = 10001000;

var PlayMapLayer = cc.Layer.extend({
    tile:null,
    map:null,
    ctor:function () {
        this.setTouchEnabled(true);
    },
    onEnter:function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        map = cc.TMXTiledMap.create("res/PlayScene/ground01.tmx");
        this.addChild(map, -1, TAG_TILE_MAP);
       
        tile = cc.Sprite.create("res/PlayScene/3002_3iPhone.png");
        map.addChild(tile);


        return true;
    },
    draw:function() {
        this.ShowGridTileMap();
    },
    registerWithTouchDispatcher:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },
    onTouchBegan:function (touch, event) {
        var touchLocation = touch.getLocation();
        return true;
    },
    onTouchMoved:function (touch, event) {
        var touchLocation = touch.getLocation();

        if (!this.prevLocation) {
            this.prevLocation = cc.p(touchLocation.x, touchLocation.y);
            return;
        }
        var node = this.getChildByTag(TAG_TILE_MAP);
        var diff = cc.pSub(touchLocation, this.prevLocation);
        var currentPos = node.getPosition();

        //diff = cc.p(diff.x * node.getScaleX(),diff.y * node.getScaleY());
        var curPos = cc.pAdd(currentPos, diff);
        node.setPosition(curPos);
        this.prevLocation = cc.p(touchLocation.x, touchLocation.y);
    },
    onTouchEnded:function (touch, event) {
        this.prevLocation = null;

        var touchLocation = touch.getLocation();
        var nodeLocation = map.convertToNodeSpace(touchLocation);
        tile.setPosition(nodeLocation);

        var tileSize = map.getTileSize();
        var tw = tileSize.width;
        var th = tileSize.height;
        var mapSize = map.getMapSize();
        var mw = mapSize.width;
        var mh = mapSize.height;
        
        var posY = mh - nodeLocation.x/tw + mw/2 - nodeLocation.y/th;
        var posX = mh + nodeLocation.x/tw - mw/2 - nodeLocation.y/th;
        var coord = cc.p(Math.floor(posX), Math.floor(posY));

        // var layer = map.layerNamed("Tile Layer 1");
        // layer.removeTileAt(coord);

        // var layer = map.layerNamed("Tile Layer 2");
        // layer.
    },
    ShowGridTileMap:function () {
        cc.renderContext.lineWidth = 3;
        cc.renderContext.strokeStyle = "#ffffff";
    
        var layer = map.layerNamed("Tile Layer 1");
        var tileSize = map.getTileSize();
        var tw = tileSize.width;
        var th = tileSize.height;
        var offset = cc.p(0, th*0.45);
        var count = 20;

        for (var i = 0; i <= count; ++i) {          
            var start = layer.positionAt(cc.p(i, -1));
            var end = layer.positionAt(cc.p(i, count-1));

            start = cc.pAdd(start, offset);
            end = cc.pAdd(end, offset);
            cc.drawingUtil.drawLine(start, end);
        }
        for (var i = 0; i <= count; ++i) {
            var start = layer.positionAt(cc.p(0, i-1));
            var end = layer.positionAt(cc.p(count, i-1));

            start = cc.pAdd(start, offset);
            end = cc.pAdd(end, offset);
            cc.drawingUtil.drawLine(start, end);
        }

        cc.renderContext.lineWidth = 1;
    },
});

var PlayUILayer = cc.Layer.extend({
    ctor:function () {
    },
    onEnter:function () {
        var size = cc.Director.getInstance().getWinSize();

        var menu = cc.Menu.create(null);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);

        var LevelItem = cc.MenuItemImage.create(
            "res/PlayScene/top_lvexp00.png",
            "res/PlayScene/top_lvexp00.png",
            this,
            function () {
            });
        LevelItem.setAnchorPoint(new cc.p(0.5, 0.5));
        LevelItem.setPosition(new cc.p(size.width * 0.1, size.height * 0.93));
        menu.addChild(LevelItem);

        var CoinItem = cc.MenuItemImage.create(
            "res/PlayScene/top_coin.png",
            "res/PlayScene/top_coin_p.png",
            this,
            function () {
            });
        CoinItem.setAnchorPoint(new cc.p(0.5, 0.5));
        CoinItem.setPosition(new cc.p(size.width * 0.28, size.height * 0.93));
        menu.addChild(CoinItem);

        var CashItem = cc.MenuItemImage.create(
            "res/PlayScene/top_cash.png",
            "res/PlayScene/top_cash_p.png",
            this,
            function () {
            });
        CashItem.setAnchorPoint(new cc.p(0.5, 0.5));
        CashItem.setPosition(new cc.p(size.width * 0.45, size.height * 0.93));
        menu.addChild(CashItem);

        var PopItem = cc.MenuItemImage.create(
            "res/PlayScene/top_pop.png",
            "res/PlayScene/top_pop_p.png",
            this,
            function () {
            });
        PopItem.setAnchorPoint(new cc.p(0.5, 0.5));
        PopItem.setPosition(new cc.p(size.width * 0.75, size.height * 0.93));
        menu.addChild(PopItem);

        var PopItem = cc.MenuItemImage.create(
            "res/PlayScene/top_sp.png",
            "res/PlayScene/top_sp_p.png",
            this,
            function () {
            });
        
        PopItem.setAnchorPoint(new cc.p(0.5, 0.5));
        PopItem.setPosition(new cc.p(size.width * 0.9, size.height * 0.93));
        menu.addChild(PopItem);

        return true;
    },
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var MapLayer = new PlayMapLayer();
        this.addChild(MapLayer);

        var UILayer = new PlayUILayer();
        this.addChild(UILayer);
    }
});
