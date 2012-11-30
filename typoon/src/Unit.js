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

		this.prev_position = this.getPosition();
		this.prev_direction = this.direction = 1;
		console.log(this.prev_position);

		var size = cc.Director.getInstance().getWinSize();

		var cache = cc.SpriteFrameCache.getInstance();
		cache.removeSpriteFrames();

		cache.addSpriteFrames("res/Unit/help.plist");
		cache.addSpriteFrames("res/Unit/move.plist");
		cache.addSpriteFrames("res/Unit/distort.plist");
		cache.addSpriteFrames("res/Unit/gather.plist");
		cache.addSpriteFrames("res/Unit/chop.plist");
		cache.addSpriteFrames("res/Unit/kick.plist");
		cache.addSpriteFrames("res/Unit/open.plist");

		this.body = cc.Sprite.createWithSpriteFrameName(cache.getSpriteFrame("move_p0.png"));
		this.body.setScale(0.5, 0.5);
		this.addChild(this.body, 0);
	},
	onEnter:function () {
		this._super();
	       	this.scheduleUpdate();
	},
	update:function (dt) {
		if (this.getPositionX() - this.prev_position.x > 0) {
			if (this.direction < 0) {
				this.direction = 1;
				var flip = cc.FlipX.create(90);
				this.body.runAction(flip);
			}
		} else if (this.getPositionX() - this.prev_position.x < 0){
			if (this.direction > 0) {
				this.direction = -1;
				var flip = cc.FlipX.create(0);
				this.body.runAction(flip);
			}
		} else {
			// if 
			// this.setAnimation("stay");
		}
		this.prev_position = this.getPosition();
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
		console.log(this.building_type);
		var house = gg.House.create(this.building_type);
		var world = this.getPosition();
		var map = this.getParent().getPosition();

		house.setPosition(this.prev_position);
		this.getParent().addChild(house, 2);
	},
	setAnimation:function(name) {
		this.body.stopAllActions();
		var count = 0;
		if (name == "help") {
			count = 98;
		} else if (name == "move") {
			count = 20;
		} else if (name == "distort") {
			count = 27;
		} else if (name == "gather") {
			count = 33;
		} else if (name == "chop") {
			count = 35;
		} else if (name == "kick") {
			count = 50;
		} else if (name == "open") {
			count = 30;
		}

		var cache = cc.SpriteFrameCache.getInstance();
		var frames = [];
		for (var i = 0; i < count; ++i) {
			var framename = name + "_p" + i + ".png";
			// console.log(name);
			var frame = cache.getSpriteFrame(framename);
			frames.push(frame);
		}

		var animation = cc.Animation.create(frames, 1/30);
		var animate = cc.Animate.create(animation);
		this.body.runAction(cc.RepeatForever.create(animate));
	},
});

gg.Unit.create = function () {
	return new gg.Unit();
};
