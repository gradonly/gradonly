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
	ctor:function () {
		this._super();
		prev_position = this.getPositionX();
		prev_direction = direction = 1;

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
		if (this.getPositionX() - prev_position > 0) {
			if (direction < 0) {
				direction = 1;
				var flip = cc.FlipX.create(90);
				this.body.runAction(flip);
			}
		} else if (this.getPositionX() - prev_position < 0){
			if (direction > 0) {
				direction = -1;
				var flip = cc.FlipX.create(0);
				this.body.runAction(flip);
			}
		}
		prev_position = this.getPositionX();
	},

	move:function (coords) {
		var map = this.getParent();
		var layer = map.layerNamed("MapLayer");
		var actions= [];
		var temp_position = this.getPosition();
		for (var i in coords) {
			var coord = coords[i];
			var position = layer.positionAt(coord);
			position.x += 30;
			position.y += 30;

			var move = cc.MoveTo.create(0.5,  position);
			actions.push(move);
		}

		if (this.state_type == UNIT_STATE_BUILDING) {
			var callfunc = cc.CallFunc.create(this, this.build, null);
			actions.push(callfunc);
		}

		var sequence = cc.Sequence.create(actions);
		console.log(sequence);
		
		// if path is not blank, go through.
		if( sequence != undefined )
			this.runAction(sequence);
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
	setBuildingType:function(type) {
		this.building_type = type;
	},
	build:function(type) {
		var house = cc.House.create(type, setPosition);
		this.getParent().addChild().addChild(house);
	},
});

gg.Unit.create = function () {
	return new gg.Unit();
};
