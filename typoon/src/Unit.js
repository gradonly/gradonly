var gg = gg = gg || {};

var UNIT_STATE_DEFAULT = 0;
var UNIT_STATE_BUILDING = 1;

gg.Unit = cc.Node.extend({
	body:null,
	prev_position:null,
	prev_direction:0,
	direction:0,
	state_type:0,
	building_type:0,
	coords:null,
	ctor:function () {
		this._super();

	},

	onEnter:function () {
		this._super();
		console.log(this);

		this.prev_position = this.getPositionX();
		this.prev_direction = this.direction = 1;

		var size = cc.Director.getInstance().getWinSize();

		var cache = cc.SpriteFrameCache.getInstance();
		cache.addSpriteFrames("res/Unit/move.plist");

		this.body = cc.Sprite.createWithSpriteFrameName(cache.getSpriteFrame("move_p0.png"));
		this.body.setScale(0.5, 0.5);
		this.addChild(this.body, 0);

		var count = 20;
		var frames = [];
		for (var i = 0; i < count; ++i) {
			var name = "move_p" + i + ".png";
			// console.log(name);
			var frame = cache.getSpriteFrame(name);
			frames.push(frame);
		}

		var animation = cc.Animation.create(frames, 1/30);
		var animate = cc.Animate.create(animation);
		this.body.runAction(cc.RepeatForever.create(animate));
	},

	onEnter:function () {
		this._super();
	       	this.scheduleUpdate();
	},

	update:function (dt) {
		if (this.getPositionX() - this.prev_position > 0) {
			if (this.direction < 0) {
				this.direction = 1;
				var flip = cc.FlipX.create(90);
				this.body.runAction(flip);
			}
		} else if (this.getPositionX() - this.prev_position < 0){
			if (this.direction > 0) {
				this.direction = -1;
				var flip = cc.FlipX.create(0);
				this.body.runAction(flip);
			}
		}
		this.prev_position = this.getPositionX();
	},

	setCoords:function(coords) {
		this.coords = coords;
	},

	setPositionFromCoord:function(coord) {
		var layer = this.getParent().layerNamed("MapLayer");
		var position = layer.positionAt(coord);
		position.x += 30;
		position.y += 30;

		this.setPosition(position);
	},
	getCoordInMap:function() {
		var map = this.getParent();
		var tileSize = map.getTileSize();
	            	var tw = tileSize.width;
	            	var th = tileSize.height;
	            	var mapSize = map.getMapSize();
	            	var mw = mapSize.width;
	            	var mh = mapSize.height;
	            	var position = this.getPosition();
	            
	            	var posY = mh - position.x/tw + mw/2 - position.y/th;
	            	var posX = mh + position.x/tw - mw/2 - position.y/th;
	            	var coord = cc.p(Math.floor(posX), Math.floor(posY));

	            	return coord;
	},
	setState:function(type) {
		this.state_type = type;
	},
	getState:function() {
		return this.state_type;
	},
	setBuilding:function(type) {
		this.building_type = type;
	},
	build:function() {
		var house = gg.House.create(this.building_type);
		var world = this.getPosition();
		var map = this.getParent().getPosition();

		house.setPosition(this.prev_position);
		this.getParent().addChild(house, 2);
	},
});

gg.Unit.create = function () {
	return new gg.Unit();
};
