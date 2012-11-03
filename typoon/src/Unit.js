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

		// body = cc.Sprite.create("res/PlayScene/top_cash.png");
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

		this.scheduleUpdate();
	},
	update:function (dt) {
		// cc.log("update called:" + dt);
	},
	move:function (coord) {
		var map = this.getParent();
		var layer = map.layerNamed("MapLayer");
		var position = layer.positionAt(coord);
		position = cc.pSub(position, this.getPosition());
		position.x += 30;
		position.y += 30;

		this.runAction(cc.MoveBy.create(0.5,  position));
	},
});

gg.Unit.create = function (/*Multiple Arguments*/) {
	var ret = new gg.Unit();
	return ret;
};
