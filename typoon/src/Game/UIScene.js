
var TAG_LAYER_MAP = 12433;
var TAG_LAYER_UI = 209045;
var TAG_TILE_MAP = 10001000;

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

var UIPlayMapLayer = cc.Layer.extend({
    tile:null,
    map_layer:null,
    object_layer:null,
    tile_button:0,
    unit:null,
    mapGraph:null,
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
       
        // 오브젝트 레이어를 가지고 맵을 만든다.
        mapGraph = makeNodesFromMap(map);

        map_layer = map.layerNamed("MapLayer");

        object_layer = map.layerNamed("ObjectLayer");

        unit = gg.Unit.create();
        map.addChild(unit, 2);

        map.reorderChild(map_layer, 0);
        map.reorderChild(unit, 1);
        map.reorderChild(object_layer, 2);
        
        unit.setPositionFromCoord(cc.p(10, 18));
        
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
              // (x, y) 
            // sequence
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

var UIUILayer = cc.Layer.extend({
    m_window:null,
    m_winSize:null,

    ctor:function () {
        this.m_winSize = cc.Director.getInstance().getWinSize();
    },
    onEnter:function () {
        this._super();

        this.TopMenu();
        this.LeftMenu();
        this.RightMenu();

        this.m_window = new gg.UIWindow();
        this.m_window.setPosition(cc.p(this.m_winSize.width/2,this.m_winSize.height/2));
        this.addChild(this.m_window);

        return true;
    },
    TopMenu:function () {
        // var size = cc.Director.getInstance().getWinSize();

        // var menu = cc.Menu.create(null);
        // menu.setPosition(cc.PointZero());
        // this.addChild(menu, 1);

        // var LevelItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_lvexp00.png",        // normal image
        //     "res/PlayScene/top_lvexp00.png",        // selected images
        //     this,                                   // disabled image or target
        //     function () {                           // callback method
        //         console.log(this);
        //         console.log(LevelItem);
        //         console.log(LevelItem.getPosition());
        //     });

        // //console.log(LevelItem);
        // LevelItem.setAnchorPoint(cc.p(0.5, 0.5));
        // LevelItem.setPosition(cc.p(size.width * 0.1, size.height * 0.93));
        // //LevelItem.setTouchEnabled(true);
        // //LevelItem.registerWithTouchDispatcher(function(){ console.log(this) });

        // menu.addChild(LevelItem);

        // // coinItem
        // var CoinItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_coin.png",
        //     "res/PlayScene/top_coin_p.png",
        //     this,
        //     function () {
        //     });
        // CoinItem.setAnchorPoint(cc.p(0.5, 0.5));
        // CoinItem.setPosition(cc.p(size.width * 0.28, size.height * 0.93));
        // menu.addChild(CoinItem);

        // // cashItem
        // var CashItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_cash.png",
        //     "res/PlayScene/top_cash_p.png",
        //     this,
        //     function () {
        //     });
        // CashItem.setAnchorPoint(cc.p(0.5, 0.5));
        // CashItem.setPosition(cc.p(size.width * 0.45, size.height * 0.93));
        // menu.addChild(CashItem);

        // // popItem
        // var PopItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_pop.png",
        //     "res/PlayScene/top_pop_p.png",
        //     this,
        //     function () {
        //     });
        // PopItem.setAnchorPoint(cc.p(0.5, 0.5));
        // PopItem.setPosition(cc.p(size.width * 0.75, size.height * 0.93));
        // menu.addChild(PopItem);

        // var jwelItem = cc.MenuItemImage.create(
        //     "res/PlayScene/top_sp.png",
        //     "res/PlayScene/top_sp_p.png",
        //     this,
        //     function () {
        //     });
        // jwelItem.setAnchorPoint(cc.p(0.5, 0.5));
        // jwelItem.setPosition(cc.p(size.width * 0.9, size.height * 0.93));
        // menu.addChild(jwelItem);
    },

    LeftMenu:function () {
        // var menu = cc.Menu.create();
        // menu.setPosition(cc.p(100, 500));
        // this.addChild(menu);

        // var item_number = 9;
        // var path = "res/UIItem/";
        // for (var i = 0; i < item_number; ++i) {
        //     var file = path + "UI" + i + ".png";
        //     var item = cc.MenuItemImage.create(file, file, null, this, this.SelectMenuLeftItem);
        //     console.log(item);
        //     console.log(item.getContentSize());
        //     var itemHeight = item.getContentSize().height
        //     item.setAnchorPoint(0.5, 0.5);
        //     item.buttonType = i+1;
        //     item.setPosition(0, i*(-itemHeight));
        //     menu.addChild(item);
        // }
    },

    // Right is property of UI object Menu
    RightMenu:function() {
        var size = cc.Director.getInstance().getWinSize();
        console.log("size width" + size.width + " size height" + size.height);

        // cc.canvas.addEventListener("keydown", function(e) {
        //     cc.keyboardDispatcher.dispatchKeyboardMSG(e, true);
        //     //cc.IMED

        // })

        // property_title
        var property_title = cc.LabelTTF.create("Property Of UI Menu Object", "Arial", 12);
        property_title.setPosition(cc.p(size.width * 0.5 + 25, size.height * 0.45 - 38));
        property_title.setColor(new cc.Color3B(255, 255, 255));
        this.addChild(property_title);

        console.log(property_title);

        
        //  keyboard input
        var keyboardDispatcher = new cc.KeyboardDispatcher.getInstance();
        keyboardDispatcher.addDelegate({
            onKeyUp:function(e){
                console.log(e);
                // Menu.method call.
                
                // in Menu. method 
                // child method가  키보드 이벤트가 필요하면 처리...
            },
            onKeyDown:function(e){
                console.log(e);
            }
        });
    },

    SelectMenuLeftItem:function (sender) {
        console.log(tile_button);
        map_layer = this.getParent().getChildByTag(TAG_LAYER_MAP);
        map_layer.getButtonType(sender.buttonType);
    },
});

var UIScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        //var MapLayer = new PlayMapLayer();
        //this.addChild(MapLayer, 0, TAG_LAYER_MAP);

        var UILayer = new UIUILayer();
        this.addChild(UILayer, 1, TAG_LAYER_UI);

    }
});
