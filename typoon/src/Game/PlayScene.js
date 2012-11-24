
var TAG_LAYER_MAP = 12434;
var TAG_LAYER_UI = 209046;

var TAG_TILE_MAP_LAYER = 10001001;
var TAG_TILE_OBJECT_LAYER = 10001002;

var Node = cc.Node;

var makeNodesFromMap = function(map) {
    var object_layer =this.object_layer;
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
    ctor:function () {
        this.setTouchEnabled(true);

        this.tile = null;
        this.map = null;
        this.mapGraph = null;
        this.tile_button = 0;
        this.unit = null;

    },

    onEnter:function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        // cc.TMXTiledMap
        this.map = cc.TMXTiledMap.create("res/PlayScene/map/map1.tmx");
        
        // cc.TMXTiledMap -> cc.TMXLayer
        this.map_layer = this.map.layerNamed("MapLayer");
        this.object_layer = this.map.layerNamed("ObjectLayer");
        

        this.addChild(this.map_layer, 0, TAG_TILE_MAP_LAYER);
        this.addChild(this.object_layer, 1, TAG_TILE_OBJECT_LAYER);
        
        // 오브젝트 레이어를 가지고 맵을 만든다.
        this.mapGraph = makeNodesFromMap(this.map);

        console.log(gg.Unit);
        this.unit = gg.Unit.create();

       
       
        this.unit.setPositionFromCoord(cc.p(10, 18));
        this.object_layer.addChild(this.unit, 2);

        this.scheduleUpdate();

        // var map_size = this.map.getMapSize();
        // var width = map_size.width;
        // var height = map_size.height;

        // console.log(this.object_layer);
        // for (var x = 0; x < width; ++x) {
        //     for (var y = 0; y < height; ++y) {

        //         var tile = this.object_layer.tileAt(cc.p(x, y));
        //         if (tile) {
        //             this.object_layer.reorderChild(tile, x + y);
        //         }
        //     }
        // }

        return true;
    },

    draw:function() {
    },

    registerWithTouchDispatcher:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },

    update:function (dt) {
        // var map_size = this.map.getMapSize();
        // var width = map_size.width;
        // var height = map_size.height;

        // for (var i = 0; i < width; ++i) {
        //     for (var j = 0; j < height; ++j) {
        //         var sprite = this.object_layer.tileAt(cc.p(i, j));
        //         console.log(sprite.getZOrder());
        //     }
        // }
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
        var currentPos = this.map_layer.getPosition();

        var curPos = cc.pAdd(currentPos, diff);
        this.map_layer.setPosition(curPos);
        this.object_layer.setPosition(curPos);
        this.prevLocation = cc.p(touchLocation.x, touchLocation.y);
    },

    onTouchEnded:function (touch, event) {
        this.prevLocation = null;
        var map = this.map;
        var unit = this.unit;
        var mapGraph = this.mapGraph;

        if (!this.touchMoved) {
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
            console.log(coords);
            unit.move(coords);
        }

        this.touchMoved = false;
    },

    getButtonType:function(type) {
        tile_button = type;
    },
});

var PlayUILayer = cc.Layer.extend({
    ctor:function () {
    },
    onEnter:function () {
        this._super();

        this.TopMenu();

        this.CenterMenu();
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


        this.attachZoomInOutMenu(menu);

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
        PlusItem.setAnchorPoint(cc.p(0.5, 0.5));
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

        MinusItem.setAnchorPoint(cc.p(0.5, 0.5));
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
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var mapLayer = new PlayMapLayer();
        this.addChild(mapLayer, 0, TAG_LAYER_MAP);

        var uiLayer = new PlayUILayer();
        this.addChild(uiLayer, 1, TAG_LAYER_UI);
    }
});
