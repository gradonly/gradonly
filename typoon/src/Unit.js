var gg  = gg || {};

gg.Unit = cc.Node.extend({
	body:null,

	ctor:function () {
	},

	onEnter:function () {
		this._super();

		var size = cc.Director.getInstance().getWinSize();

		var cache = cc.SpriteFrameCache.getInstance();
		cache.addSpriteFrames("res/Unit/move.plist");

		body = cc.Sprite.createWithSpriteFrameName(cache.getSpriteFrame("move_p0.png"));
		body.setScale(0.5, 0.5);
		this.addChild(body, 0);

		var count = 20;
		var frames = [];
		for (var i = 0; i < count; ++i) {
			var name = "move_p" + i + ".png";
			console.log(name);
			var frame = cache.getSpriteFrame(name);
			frames.push(frame);
		}

		var animation = cc.Animation.create(frames, 1/30);
		var animate = cc.Animate.create(animation);
		body.runAction(cc.RepeatForever.create(animate));
	},
	// update:function (dt) {
	// 	// cc.log("update called:" + dt);
	// },
	move:function (coords) {
		var map = this.getParent();
		var layer = map.layerNamed("MapLayer");
		var moves= [];
		var temp_position = this.getPosition();
		for (var i in coords) {
			var coord = coords[i];
			var position = layer.positionAt(coord);
			position.x += 30;
			position.y += 30;

			var move = cc.MoveTo.create(0.5,  position);
			moves.push(move);
		}
		var sequence = cc.Sequence.create(moves);
		console.log(sequence);
		
		// if path is not blank, go through.
		if( sequence != undefined )
			this.runAction(sequence);
	},
	setPositionFromCoord:function(coord) {
		var map = this.getParent();
		var layer = map.layerNamed("MapLayer");
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
});

gg.Unit.create = function (/*Multiple Arguments*/) {
	var ret = new gg.Unit();
	return ret;
};
