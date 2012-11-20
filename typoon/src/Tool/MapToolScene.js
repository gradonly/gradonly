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

var ID_EMPTY_TILE = 0;
var ID_TERRAIN_TILE = 1;


var MapToolLayer = cc.Layer.extend({
    tile:null,
    map:null,
    tile_button:0,
    ctor:function () {
        this.setTouchEnabled(true);

        this.tile = null;
        this.map = null;
        this.tile_button = ID_EMPTY_TILE;        // blank tile.
    },
    onEnter:function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        this.map = cc.TMXTiledMap.create("res/PlayScene/map/map1.tmx");
        this.addChild(this.map, 0, TAG_TILE_MAP);

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
        var currentPos = this.map.getPosition();

        var curPos = cc.pAdd(currentPos, diff);
        this.map.setPosition(curPos);
        this.prevLocation = cc.p(touchLocation.x, touchLocation.y);
    },
    onTouchEnded:function (touch, event) {
        this.prevLocation = null;
        if (!this.touchMoved) {
            var touchLocation = touch.getLocation();
            var nodeLocation = this.map.convertToNodeSpace(touchLocation);

            var tileSize = this.map.getTileSize();
            var tw = tileSize.width;
            var th = tileSize.height;
            var mapSize = this.map.getMapSize();
            var mw = mapSize.width;
            var mh = mapSize.height;
            
            var posY = mh - nodeLocation.x/tw + mw/2 - nodeLocation.y/th;
            var posX = mh + nodeLocation.x/tw - mw/2 - nodeLocation.y/th;
            var coord = cc.p(Math.floor(posX), Math.floor(posY));
            
            this.paintMapTile(coord);
        }

        this.touchMoved = false;
    },

    // ShowGridTileMap.......
    ShowGridTileMap:function () {
        cc.renderContext.lineWidth = 3;
        cc.renderContext.strokeStyle = "#ffffff";
    
        var scale = this.map.getScale();
        var layer = this.map.layerNamed("MapLayer");
        var tileSize = this.map.getTileSize();
        var tw = tileSize.width * scale;
        var th = tileSize.height * scale;
        var offset = cc.p(0, th*0.45);
        var position = this.map.getPosition();
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

    // call back method.
    changeTileMenu:function(type) {
        // select tile_button type.
        this.tile_button = type;
        console.log(this.tile_button);
    },

    // change the map tile from crood releated x,y mouse position.
    paintMapTile:function(coord) {
        
        var tile_button = this.tile_button;
        var mapLayer = this.map.layerNamed("MapLayer");             // MapLayer
        var objectLayer = this.map.layerNamed("ObjectLayer");         // ObjectLayer

        if( tile_button == ID_EMPTY_TILE) {
            mapLayer.setTileGID( tile_button, coord, 1);
            objectLayer.setTileGID( tile_button, coord, 1);

        }else if( tile_button == ID_TERRAIN_TILE) {
            mapLayer.setTileGID(ID_EMPTY_TILE, coord, 1);
            objectLayer.setTileGID(ID_EMPTY_TILE, coord, 1);

            mapLayer.setTileGID( tile_button, coord, 1);

        } else {
            mapLayer.setTileGID(ID_EMPTY_TILE, coord, 0);
            objectLayer.setTileGID(ID_EMPTY_TILE, coord, 0);

            objectLayer.setTileGID( tile_button, coord, 0);
        }

        console.log("Layer start--------------");
        console.log(mapLayer.tileGIDAt(coord));
        console.log(objectLayer.tileGIDAt(coord));
        console.log("Layer end-----------");

    }
});

// MapTool UI Layer
var MapToolUILayer = cc.Layer.extend({
    left_tile_menu:null,
    ctor:function () {
    },
    onEnter:function () {
        this._super();

        this.TopMenu();
        this.LeftMenu();

        //this.CenterMenu();
        return true;
    },

    TopMenu:function () {
        var size = cc.Director.getInstance().getWinSize();

        var menu = cc.Menu.create(null);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);

        var LevelItem = cc.MenuItemImage.create(
            "res/PlayScene/top_lvexp00.png",
            "res/PlayScene/top_lvexp00.png",
            this, 
            function () {
                var director = cc.Director.getInstance();
                director.replaceScene(new ItemToolScene);
            });

        LevelItem.setAnchorPoint(cc.p(0.5, 0.5));
        LevelItem.setPosition(cc.p(size.width * 0.1, size.height * 0.93));
        menu.addChild(LevelItem);
    },

    LeftMenu:function () {
        this.left_tile_menu = cc.Menu.create();

        this.left_tile_menu.setPosition(cc.p(100, 500));
        this.addChild(this.left_tile_menu);

        var file = "res/PlayScene/map/transparent.png";
        var item = cc.MenuItemImage.create(file, file, null, this, this.SelectMenuLeftItem);
        item.buttonType = 1;
        item.setPosition(0, 50);
        this.left_tile_menu.addChild(item);

        file = "res/PlayScene/map/base.png";
        item = cc.MenuItemImage.create(file, file, null, this, this.SelectMenuLeftItem);
        item.buttonType = 0;
        item.setPosition(60, 50);
        this.left_tile_menu.addChild(item);

        var path = "res/PlayScene/map/" + 0 + "/";
        var item_number = 8;
        for (var i = 0; i < item_number; ++i) {
            file = path  + i + ".png";
            item = cc.MenuItemImage.create(file, file, null, this, this.SelectMenuLeftItem);

            var x = parseInt(i / 4) ;
            var y = i % 4 ;
            console.log( "x: "  + x * 50 + ", y: " + y * -60);

            item.setPosition(x * 50, y * -60);

            item.buttonType = i+1;
            this.left_tile_menu.addChild(item);
        }
    },

    // under construction message.
    CenterMenu:function() {

        var winSize = cc.Director.getInstance().getWinSize();
         // property_title
        var property_title = cc.LabelTTF.create("Game Playing Scene...Working", "Arial", 12);
        property_title.setPosition(cc.p(winSize.width * 0.5 + 25, winSize.height * 0.45 - 38));
        property_title.setColor(new cc.Color3B(255, 255, 255));
        this.addChild(property_title);
    },

    // left Menu Item' selector
    SelectMenuLeftItem:function (sender) {
        var map_layer = this.getParent().getChildByTag(TAG_LAYER_MAP);
        map_layer.changeTileMenu(sender.buttonType);
    },
});

var MapToolScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var mapLayer = new MapToolLayer();
        this.addChild(mapLayer, 0, TAG_LAYER_MAP);

        var uiLayer = new MapToolUILayer();
        this.addChild(uiLayer, 1, TAG_LAYER_UI);
    }
});
