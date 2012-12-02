
var TAG_LAYER_MAP = 12434;
var TAG_LAYER_UI = 209046;

var TAG_TILE_MAP = 10001000;
var TAG_TILE_MAP_LAYER = 10001001;
var TAG_TILE_OBJECT_LAYER = 10001002;

var Node = cc.Node;

var makeNodesFromMap = function(map) {
    //var object_layer = this.object_layer;
    var object_layer = map.layerNamed("ObjectLayer");

    var tiles = object_layer.getTiles();

    var nodes = [];
    var mapSize = map.getMapSize();
    var width = mapSize.width;
    var height = mapSize.height;

    for (var x=0; x < width; x++) {
        var nodeRow = [];
        
        for(var y = 0; y < height; y++) {
            if( tiles[y*height + x] > 0 ) {
                nodeRow.push(GraphNodeType.WALL);
            }
            else  {
                nodeRow.push(GraphNodeType.OPEN);
            }
        }
        nodes.push(nodeRow);
    }

    return new Graph(nodes);
};

// 랜덤하게 맵을 제너레이트
var generateRandom = function (width, height, wallFrequency) {
    var nodes = [];

    for (var x=0; x < width; x++) {
        var nodeRow = [];
        var gridRow = [];

        for(var y=0; y < height; y++) {

            var isWall = Math.floor(Math.random()*(1/wallFrequency));
            if(isWall == 0) {
                nodeRow.push(GraphNodeType.WALL);
            }
            else  {
                nodeRow.push(GraphNodeType.OPEN);
            }
        }
        nodes.push(nodeRow);
    }

    return new Graph(nodes);
};

var PlayMapLayer = cc.Layer.extend({
    tile:null,
    map_layer:null,
    object_layer:null,
    tile_button:0,
    unit:null,
    mapGraph:null,
    map:null,
    elapsedTime:0,
    ctor:function () {
        this.setTouchEnabled(true);
    },

    onEnter:function () {
        this._super();

        this.scheduleUpdate();

        var size = cc.Director.getInstance().getWinSize();

        // cc.TMXTiledMap
        this.map = cc.TMXTiledMap.create("res/PlayScene/map/map1.tmx");
        // cc.TMXTiledMap -> cc.TMXLayer
        this.map_layer = this.map.layerNamed("MapLayer");
        this.object_layer = this.map.layerNamed("ObjectLayer");
        
        this.addChild(this.map, 0, TAG_TILE_MAP);
        // this.addChild(this.map_layer, 0, TAG_TILE_MAP_LAYER);
        // this.addChild(this.object_layer, 1, TAG_TILE_OBJECT_LAYER);
        
        // load map data 
        this.loadMapData();


        // 오브젝트 레이어를 가지고 맵을 만든다.
        this.mapGraph = makeNodesFromMap(this.map);

        this.unit = gg.Unit.create();
        this.unit.setAnimation("stay");
        this.map.addChild(this.unit, 2);

        this.unit.setPositionFromCoord(cc.p(10, 18));

      

        return true;
    },

    draw:function() {

    },

    registerWithTouchDispatcher:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },

    update:function (dt) {
        this.elapsedTime += dt;

        if( this.elapsedTime > 1.0) {
            this.loadMapData();
            this.loadCharData();

            this.elapsedTime = 0;
        }

    },

    onTouchBegan:function (touch, event) {
        var touchLocation = touch.getLocation();
        
        return true;
    },

    onTouchMoved:function (touch, event) {
        var map = this.map;

        var touchLocation = touch.getLocation();
        this.touchMoved = true;

        if (!this.prevLocation) {
            this.prevLocation = cc.p(touchLocation.x, touchLocation.y);
            return;
        }
        var diff = cc.pSub(touchLocation, this.prevLocation);
        var map_position = this.map.getPosition();

        var current_position = cc.pAdd(map_position, diff);
        this.map.setPosition(current_position);
        this.prevLocation = cc.p(touchLocation.x, touchLocation.y);
    },

    onTouchEnded:function (touch, event) {
        this.prevLocation = null;
        var map = this.map;
        var unit = this.unit;
        var mapGraph = this.mapGraph;

        if (!this.touchMoved) {
            unit.setAnimation("move");
            var touchLocation = touch.getLocation();
            var nodeLocation = map.convertToNodeSpace(touchLocation);

            var tileSize = map.getTileSize();
            var tw = tileSize.width;
            var th = tileSize.height;
            var mapSize = map.getMapSize();
            var mw = mapSize.width;
            var mh = mapSize.height;
            
            var posY = mh - nodeLocation.x/tw + mw/2 - nodeLocation.y/th;
            var posX = mh + nodeLocation.x/tw - mw/2 - nodeLocation.y/th;
            var coord = cc.p(Math.floor(posX), Math.floor(posY));
            if (0 <= coord.x && coord.x < mw &&
                0 <= coord.y && coord.y < mh) {
                var layer = this.map_layer;
                var start_coord = unit.getCoordInMap();
                var start = mapGraph.nodes[start_coord.x][start_coord.y] ;
                var end = mapGraph.nodes[ Math.floor(posX) ] [ Math.floor(posY) ];
                var path = astar.search(mapGraph.nodes, start, end, false);
            
                var coords = [];
                for(var i = 0; i < path.length; i++) {
                    var coord = cc.p(Math.floor( path[i].x), Math.floor( path[i].y ));
                    coords.push(coord);
                }

                var actions = [];
                var layer = this.map_layer;
                var temp_position = this.getPosition();
                for (var i in coords) {
                    var coord = coords[i];
                    var position = layer.positionAt(coord);
                    position.x += 30;
                    position.y += 30;

                    var move = cc.MoveTo.create(0.5,  position);
                    actions.push(move);
                }

                var state = unit.getState();
                if (state == UNIT_STATE_DEFAULT) {
                } else if (state == UNIT_STATE_BUILDING) {
                    var buildfunc = cc.CallFunc.create(unit, unit.build);
                    actions.push(buildfunc);
                }

                var sequence = cc.Sequence.create(actions);
                unit.runAction(sequence);

            }
        }

        this.touchMoved = false;
    },
    getButtonType:function(type) {
        tile_button = type;
    },

    getUnit:function(unit) {
        return this.unit;
    },


    // paint draw paintMapTile From JSOn Data
    paintMapTileFromArray:function(mapData) {
        var tile_button = mapData.tile_button;
        var coord = mapData.pos;

        var ground = this.map_layer;
        var object_layer = this.object_layer;

        //var ground = this.map.layerNamed("MapLayer");             // MapLayer
        //var object_layer = this.map.layerNamed("ObjectLayer");         // ObjectLayer

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

        // this.removechild(this.map, true);
        //   // cc.TMXTiledMap
        // this.map = cc.TMXTiledMap.create("res/PlayScene/map/map1.tmx");
        // // cc.TMXTiledMap -> cc.TMXLayer
        // this.map_layer = this.map.layerNamed("MapLayer");
        // this.object_layer = this.map.layerNamed("ObjectLayer");
        
        // this.addChild(this.map, 0, TAG_TILE_MAP);

        var instance = gg.LocalStroageInstance();

        var mapdata = instance.get('map');
       // console.log(mapdata);

        // draw map Tile
        if(mapdata != null)
            this.paintMapTilesArray(mapdata);

         // update tile path from Map
        this.mapGraph = makeNodesFromMap(this.map);
    },

    // load char data 
    loadCharData:function() {
        var storage = gg.LocalStroageInstance();
        var animation = storage.load('char_animation');
        if( animation != null)
            this.unit.setAnimation(animation);
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

var PlayUILayer = cc.Layer.extend({
    ctor:function () {
    },
    onEnter:function () {
        this._super();

        var menu = cc.Menu.create(null);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);

        this.TopMenu(menu);
        this.attachZoomInOutMenu(menu);
        this.createHouseUI(menu);

        this.CenterMenu();

        return true;
    },
    TopMenu:function (menu) {
        var size = cc.Director.getInstance().getWinSize();
        var LevelItem = cc.MenuItemImage.create(
            "res/PlayScene/top_lvexp00.png",
            "res/PlayScene/top_lvexp00.png",
            this,
            function () {
            });
        LevelItem.setAnchorPoint(cc.p(0.5, 0.5));
        LevelItem.setPosition(cc.p(size.width * 0.1, size.height * 0.93));
        menu.addChild(LevelItem);

        var CoinItem = cc.MenuItemImage.create(
            "res/PlayScene/top_coin.png",
            "res/PlayScene/top_coin_p.png",
            this,
            function () {
            });
        CoinItem.setAnchorPoint(cc.p(0.5, 0.5));
        CoinItem.setPosition(cc.p(size.width * 0.28, size.height * 0.93));
        menu.addChild(CoinItem);

        var CashItem = cc.MenuItemImage.create(
            "res/PlayScene/top_cash.png",
            "res/PlayScene/top_cash_p.png",
            this,
            function () {
                console.log('dd');
            });
        CashItem.setAnchorPoint(cc.p(0.5, 0.5));
        CashItem.setPosition(cc.p(size.width * 0.45, size.height * 0.93));
        menu.addChild(CashItem);

        var PopItem = cc.MenuItemImage.create(
            "res/PlayScene/top_pop.png",
            "res/PlayScene/top_pop_p.png",
            this,
            function () {
            });
        PopItem.setAnchorPoint(cc.p(0.5, 0.5));
        PopItem.setPosition(cc.p(size.width * 0.75, size.height * 0.93));
        menu.addChild(PopItem);

        var PopItem = cc.MenuItemImage.create(
            "res/PlayScene/top_sp.png",
            "res/PlayScene/top_sp_p.png",
            this,
            function () {
            });
        PopItem.setAnchorPoint(cc.p(0.5, 0.5));
        PopItem.setPosition(cc.p(size.width * 0.9, size.height * 0.93));
        menu.addChild(PopItem);
    },

    attachZoomInOutMenu:function(menu) {
        var size = cc.Director.getInstance().getWinSize();
        var PlusItem = cc.MenuItemImage.create(
            "res/UIItem/plus.png",
            "res/UIItem/plus.png",
            this, 
            function () {
                var map_layer = this.getParent().getChildByTag(TAG_LAYER_MAP);
                var map = map_layer.map;
                var number = map.getScale();
                number += 0.2;
                map.setScale(number);
            });
        PlusItem.setPosition(cc.p(size.width * 0.3, size.height * 0.85));
        menu.addChild(PlusItem);

        var MinusItem = cc.MenuItemImage.create(
            "res/UIItem/minus.png",
            "res/UIItem/minus.png",
            this,
            function () {
                var map_layer = this.getParent().getChildByTag(TAG_LAYER_MAP);
                var map = map_layer.map;
                var number = map.getScale();
                number -= 0.2;
                map.setScale(number);
            });

        MinusItem.setPosition(cc.p(size.width * 0.4, size.height * 0.85));
        menu.addChild(MinusItem);
    },

    CenterMenu:function() {
        var size = cc.Director.getInstance().getWinSize();
         // property_title
        var property_title = cc.LabelTTF.create("Game Playing Scene...Working", "Arial", 12);
        property_title.setPosition(cc.p(size.width * 0.5 + 25, size.height * 0.45 - 38));
        property_title.setColor(new cc.Color3B(255, 255, 255));
        this.addChild(property_title);
    },

    SelectMenuLeftItem:function (sender) {
        console.log(tile_button);
        var map_layer = this.getParent().getChildByTag(TAG_LAYER_MAP);
        map_layer.getButtonType(sender.buttonType);
    },

    createHouseUI:function(menu) {
        var frame = cc.Sprite.create("res/uiitem/house/frame.png");
        frame.setPosition(cc.p(400, 100));
        this.addChild(frame, 0);

        for (var i = 0; i < 5; ++i) {
            var item = cc.MenuItemImage.create(
            "res/uiitem/house/map_" + i + ".png",
            null,
            this,
            function () {
                var layer = this.getParent().getChildByTag(TAG_LAYER_MAP);
                var unit = layer.getUnit();

                unit.setState(UNIT_STATE_BUILDING);
                unit.setBuilding(i);
            });

            item.setPosition(cc.p(160+120*i, 100));
            menu.addChild(item);
        }
    },
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var uiLayer = new PlayUILayer();
        this.addChild(uiLayer, 1, TAG_LAYER_UI);

        var mapLayer = new PlayMapLayer();
        this.addChild(mapLayer, 0, TAG_LAYER_MAP);
    }
});
