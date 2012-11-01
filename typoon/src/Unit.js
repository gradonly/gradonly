
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
        body.setPosition(new cc.p(size.width / 2, size.height / 2));
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
});

gg.Unit.create = function (/*Multiple Arguments*/) {
    var ret = new gg.Unit();
    return ret;
};