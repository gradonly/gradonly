
var TAG_LAYER_MAP = 12434;
var TAG_LAYER_UI = 209046;
var TAG_TILE_MAP = 10001001;

var makeNodesFromMap = function(map) {
    object_layer = map.layerNamed("ObjectLayer");
    var tiles = object_layer.getTiles()

    var nodes = [];
    var mapSize = map.getMapSize();
    var width = mapSize.width;
    var height = mapSize.height;

    console.log("=======");
    console.log(tiles);
    console.log("=======");

    for (var x=0; x < width; x++) {
        var nodeRow = [];
        
        for(var y = 0; y < height; y++) {
            if( tiles[y*height + x] > 0 ) {
                nodeRow.push(GraphNodeType.WALL);
                console.log("It's wall");
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

        this.map = cc.TMXTiledMap.create("res/PlayScene/map/map1.tmx");
        var map = this.map;

        this.addChild(map, 0, TAG_TILE_MAP);
       
        // 오브젝트 레이어를 가지고 맵을 만든다.
        this.mapGraph = makeNodesFromMap(map);

        this.map_layer = map.layerNamed("MapLayer");

        this.object_layer = map.layerNamed("ObjectLayer");

        var unit = gg.Unit.create();
        map.addChild(unit, 2);

        unit.setPositionFromCoord(cc.p(10, 18));
        this.unit = unit;

        map.reorderChild(this.map_layer, 0);
        map.reorderChild(this.unit, 1);
        map.reorderChild(this.object_layer, 2);
        
        return true;
    },

    draw:function() {
        // Play Scene에서는 그리그가 필요없다.
        //this.ShowGridTileMap();
    },

    registerWithTouchDispatcher:function () {
        console.log("registerWithTouchDispatcher() called");
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
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
        var currentPos = map.getPosition();

        var curPos = cc.pAdd(currentPos, diff);
        this.map.setPosition(curPos);
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
            //layer.setTileGID(tile_button, coord, 0);
              // (x, y) 

            // Move the Path
            // sequence
            var start_coord = unit.getCoordInMap();
            var start = mapGraph.nodes[start_coord.x][start_coord.y] ;
            var end = mapGraph.nodes[ Math.floor(posX) ] [ Math.floor(posY) ];
            var path = astar.search(mapGraph.nodes, start, end, false);
        
            // for(var j = 0; j < 20; j++) {
            //    console.log( 
            //     "[" + mapGraph.nodes[0][j].type +"]" 
            //     + "[" + mapGraph.nodes[1][j].type +"]" 
            //     + "[" + mapGraph.nodes[2][j].type +"]" 
            //     + "[" + mapGraph.nodes[3][j].type +"]" 
            //     + "[" + mapGraph.nodes[4][j].type +"]" 
            //     + "[" + mapGraph.nodes[5][j].type +"]"
            //     + "[" + mapGraph.nodes[6][j].type +"]"
            //     + "[" + mapGraph.nodes[7][j].type +"]"
            //     + "[" + mapGraph.nodes[8][j].type +"]"
            //     + "[" + mapGraph.nodes[9][j].type +"]"
            //     + "[" + mapGraph.nodes[10][j].type +"]" 
            //     + "[" + mapGraph.nodes[11][j].type +"]" 
            //     + "[" + mapGraph.nodes[12][j].type +"]" 
            //     + "[" + mapGraph.nodes[13][j].type +"]" 
            //     + "[" + mapGraph.nodes[14][j].type +"]" 
            //     + "[" + mapGraph.nodes[15][j].type +"]"
            //     + "[" + mapGraph.nodes[16][j].type +"]"
            //     + "[" + mapGraph.nodes[17][j].type +"]"
            //     + "[" + mapGraph.nodes[18][j].type +"]"
            //     + "[" + mapGraph.nodes[19][j].type +"]"
            //     );
            // }

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

    ShowGridTileMap:function () {
        cc.renderContext.lineWidth = 3;
        cc.renderContext.strokeStyle = "#ffffff";
        var map = this.map;

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

var PlayUILayer = cc.Layer.extend({
    ctor:function () {
    },
    onEnter:function () {
        this._super();

        this.TopMenu();
        //this.LeftMenu();

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

    LeftMenu:function () {
        var menu = cc.Menu.create();
        menu.setPosition(cc.p(100, 500));
        this.addChild(menu);

        var item_number = 5;
        var path = "res/LeftMenu/";
        for (var i = 0; i < item_number; ++i) {
            var file = path + "tile" + i + ".png";

            var item = cc.MenuItemImage.create(file, file, null, this, this.SelectMenuLeftItem);
            item.buttonType = i+1;
            item.setPosition(0, i*-50);
            menu.addChild(item);
        }

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
