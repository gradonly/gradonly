
var TAG_LAYER_MAP = 12433;
var TAG_LAYER_UI = 209045;
var TAG_TILE_MAP = 10001000;

var ID_EMPTY_TILE = 0;
var ID_TERRAIN_TILE = 1;

var BUTTON_TYPE_PERV = 0
var BUTTON_TYPE_NEXT = 1

var TILESET_MAX = 4;
var TILE_MAX = 8;


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
        var stroage = gg.LocalStroageInstance();
        
        this.map = cc.TMXTiledMap.create("res/PlayScene/map/map1.tmx");
    
        this.addChild(this.map, 0, TAG_TILE_MAP);


        this.loadMapData();
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
            if (0 <= coord.x && coord.x < mw &&
                0 <= coord.y && coord.y < mh) {
                // draw tile.
                this.paintMapTile(coord);
                // save tile.
                this.saveMapData(coord);
            }
        }

        this.touchMoved = false;

        // // save map information data to localstorage.
        // var instance = gg.LocalStroageInstance();
        // var instnace2 = gg.LocalStroageInstance();
        // var instance3 = gg.LocalStroageInstance();

        // instance.save('ok', 'dddddddd');
        // instance.save('ok2', 'dddddddd2');
        // var test = instance.load('ok');
        // var test2 = instance.load('ok2');
        // console.log(test);
        // console.log(test2);

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
        var ground = this.map.layerNamed("MapLayer");             // MapLayer
        var object_layer = this.map.layerNamed("ObjectLayer");         // ObjectLayer

        if( tile_button == ID_EMPTY_TILE) {
            ground.setTileGID( tile_button, coord, 1);
            object_layer.setTileGID( tile_button, coord, 1);
        }else if( tile_button == ID_TERRAIN_TILE) {
            ground.setTileGID( tile_button, coord, 1);
            object_layer.setTileGID(ID_EMPTY_TILE, coord, 1);
        } else {
            ground.setTileGID( ID_TERRAIN_TILE, coord, 1);
            object_layer.setTileGID( tile_button, coord, 0);
        }
    },


    // paint draw paintMapTile From JSOn Data
    paintMapTileFromArray:function(mapData) {
        var tile_button = mapData.tile_button;
        var coord = mapData.pos;

        var ground = this.map.layerNamed("MapLayer");             // MapLayer
        var object_layer = this.map.layerNamed("ObjectLayer");         // ObjectLayer

        if( tile_button == ID_EMPTY_TILE) {
            ground.setTileGID( tile_button, coord, 1);
            object_layer.setTileGID( tile_button, coord, 1);
        }else if( tile_button == ID_TERRAIN_TILE) {
            ground.setTileGID( tile_button, coord, 1);
            object_layer.setTileGID(ID_EMPTY_TILE, coord, 1);
        } else {
            ground.setTileGID( ID_TERRAIN_TILE, coord, 1);
            object_layer.setTileGID( tile_button, coord, 0);
        }
    },

    paintMapTilesArray:function(mapDatas) {

        for(var i = 0; i < mapDatas.length; i++)
        {
            var element = mapDatas[i];
            this.paintMapTileFromArray( element );
        }
    },

     // load map data and paint map data.
    loadMapData:function() {
        var instance = gg.LocalStroageInstance();

        var mapdata = instance.get('map');
        console.log(mapdata);
        if( mapdata != null)
            this.paintMapTilesArray(mapdata);
    },

    // save map data
    saveMapData:function(coord) {
         // svae map ifo data.
        var instance = gg.LocalStroageInstance();
        var parcelMapdata = new Object();
            parcelMapdata.tile_button = this.tile_button;
            parcelMapdata.pos = coord;
            instance.add('map', parcelMapdata);

    }

});

// MapTool UI Layer
var MapToolUILayer = cc.Layer.extend({
    left_tile_menu:null,
    tileset_type:0,
    outline:null,
    ctor:function () {
        this.tileset_type = 0;
        this.outline = null;
    },
    onEnter:function () {
        this._super();

        this.outline = cc.Sprite.create("res/PlayScene/map/outline.png");
        this.outline.setPosition(cc.p(0, 60));
        this.addChild(this.outline, 2);

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
        var menu = cc.Menu.create(null);
        menu.setPosition(cc.p(100, 500));
        this.addChild(menu);

        var file, file_p;
        var item;
        file = "res/PlayScene/map/transparent.png";
        item = cc.MenuItemImage.create(file, file, null, this, this.SelectMenuLeftItem);
        item.buttonType = ID_EMPTY_TILE;
        item.setPosition(0, 50);
        menu.addChild(item);

        file = "res/PlayScene/map/base.png";
        item = cc.MenuItemImage.create(file, file, null, this, this.SelectMenuLeftItem);
        item.buttonType = ID_TERRAIN_TILE;
        item.setPosition(60, 50);
        menu.addChild(item);

        this.SetLeftMenuTileset(this.tileset_type);

        file = "res/PlayScene/prev.png";
        file_p = "res/PlayScene/prev_p.png";
        item = cc.MenuItemImage.create(file, file_p, null, this, this.ChangeTileset);
        item.setPosition(0, -240);
        item.button_type = BUTTON_TYPE_PERV;
        menu.addChild(item);

        file = "res/PlayScene/next.png";
        file_p = "res/PlayScene/next_p.png";
        item = cc.MenuItemImage.create(file, file_p, null, this, this.ChangeTileset);
        item.setPosition(60, -240);
        item.button_type = BUTTON_TYPE_NEXT;
        menu.addChild(item);
    },
    SetLeftMenuTileset:function (tileset) {
        if (this.left_tile_menu) {
            this.removeChild(this.left_tile_menu, true);
        }

        this.left_tile_menu = cc.Menu.create(null);
        this.left_tile_menu.setPosition(cc.p(100, 500));
        this.addChild(this.left_tile_menu);

        var path = "res/PlayScene/map/" + tileset + "/";
        var item_number = 8;
        for (var i = 0; i < item_number; ++i) {
            var file = path  + i + ".png";
            var item = cc.MenuItemImage.create(file, file, null, this, this.SelectMenuLeftItem);
            var x = parseInt(i / 4) ;
            var y = i % 4 ;

            // position을 만들때 이렇게 사용할 것.
            item.setPosition(cc.p(x*50, y*-60));

            //item.setPosition(x * 50, y * -60);
            item.buttonType =  2 + tileset*item_number + i;
            this.left_tile_menu.addChild(item);
        }
    },
    ChangeTileset:function(sender) {
        item = sender;
        if (item.button_type == BUTTON_TYPE_PERV) {
            if (this.tileset_type > 0) {
                this.SetLeftMenuTileset(--this.tileset_type);
            }
        } else if (item.button_type == BUTTON_TYPE_NEXT) {
            if (this.tileset_type < TILESET_MAX) {
                this.SetLeftMenuTileset(++this.tileset_type);
            }
        }

        this.outline.setPosition(cc.p(0, 60));
        var map_layer = this.getParent().getChildByTag(TAG_LAYER_MAP);
        map_layer.changeTileMenu(ID_EMPTY_TILE);
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
        var item = sender;
        var map_layer = this.getParent().getChildByTag(TAG_LAYER_MAP);
        map_layer.changeTileMenu(sender.buttonType);

        var pos1 = this.left_tile_menu.getPosition();
        var pos2 = item.getPosition();
         this.outline.setPosition(cc.pAdd(pos1, pos2));
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
