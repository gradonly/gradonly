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

var TAG_LAYER_MAP = 12433;
var TAG_LAYER_UI = 209045;
var TAG_TILE_MAP = 10001000;

var MapToolLayer = cc.Layer.extend({
    tile:null,
    map:null,
    tile_button:0,
    ctor:function () {
        this.setTouchEnabled(true);

        tile = null;
        map = null;
        tile_button = 0;
    },
    onEnter:function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        map = cc.TMXTiledMap.create("res/PlayScene/ground02.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);
       
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
        this.touchMoved = true;

        if (!this.prevLocation) {
            this.prevLocation = cc.p(touchLocation.x, touchLocation.y);
            return;
        }
        var diff = cc.pSub(touchLocation, this.prevLocation);
        var currentPos = map.getPosition();

        var curPos = cc.pAdd(currentPos, diff);
        map.setPosition(curPos);
        this.prevLocation = cc.p(touchLocation.x, touchLocation.y);
    },
    onTouchEnded:function (touch, event) {
        this.prevLocation = null;
        if (!this.touchMoved) {
            var touchLocation = touch.getLocation();
            var nodeLocation = map.convertToNodeSpace(touchLocation);
            // tile.setPosition(nodeLocation);

            var tileSize = map.getTileSize();
            var tw = tileSize.width;
            var th = tileSize.height;
            var mapSize = map.getMapSize();
            var mw = mapSize.width;
            var mh = mapSize.height;
            
            var posY = mh - nodeLocation.x/tw + mw/2 - nodeLocation.y/th;
            var posX = mh + nodeLocation.x/tw - mw/2 - nodeLocation.y/th;
            var coord = cc.p(Math.floor(posX), Math.floor(posY));

            var layer = map.layerNamed("MapLayer");
            // console.log(tile_button);
            layer.setTileGID(tile_button, coord, 0);
        }

        this.touchMoved = false;
    },
    ShowGridTileMap:function () {
        cc.renderContext.lineWidth = 3;
        cc.renderContext.strokeStyle = "#ffffff";
    
        var layer = map.layerNamed("MapLayer");
        var tileSize = map.getTileSize();
        var tw = tileSize.width;
        var th = tileSize.height;
        var offset = cc.p(0, th*0.45);
        var position = map.getPosition();
        offset = cc.pAdd(offset, position);
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
    getButtonType:function(type) {
        tile_button = type;
    },
});

var MapToolUILayer = cc.Layer.extend({
    ctor:function () {
    },
    onEnter:function () {
        this._super();

        this.LeftMenu();

        return true;
    },
    LeftMenu:function () {
        var menu = cc.Menu.create();
        menu.setPosition(cc.p(100, 500));
        this.addChild(menu);

        var item_number = 5;
        var path = "res/LeftMenu/";
        for (var i = 0; i < item_number; ++i) {
            var file = path + "tile" + i + ".png";

            var item = cc.MenuItemImage.create(file, file, null, this, this.SelectMenuLeftItem);
            var item2 = new cc.MenuItemImageMapLeft();
            var item3 = new gg.MenuItemImageMapLeft();
            var item4 = new MenuItemImageMapLeft();
            item.buttonType = i+1;
            item.setPosition(0, i*-50);
            menu.addChild(item);
        }
    },
    SelectMenuLeftItem:function (sender) {
        console.log(tile_button);
        map_layer = this.getParent().getChildByTag(TAG_LAYER_MAP);
        map_layer.getButtonType(sender.buttonType);
    },
});

var MapToolScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var MapLayer = new MapToolLayer();
        this.addChild(MapLayer, 0, TAG_LAYER_MAP);

        var UILayer = new MapToolUILayer();
        this.addChild(UILayer, 1, TAG_LAYER_UI);
    }
});
