// node -> setTouchenabled가 불가능
var UIWindow = cc.Node.extend({
	m_lbael:null,
	m_textbox:null,
	_rect:null,

 	rect:function () {
        return cc.rect(-this._rect.size.width / 2, -this._rect.size.height / 2, this._rect.size.width, this._rect.size.height);
    },

	ctor:function() {
		 this._rect = cc.rect(0, 0, 150, 100);
	},	

	onEnter:function() {
		// Label Name
		this.m_label = cc.LabelTTF.create("Name", "Arial", 12);
        this.m_label.setPosition(cc.p(100,0));
        this.m_label.setColor(new cc.Color3B(255, 255, 255));
        this.addChild(this.m_label);

        // TextBox Name
        this.m_textbox = cc.LabelTTF.create("TextBox", "Arial", 12);
        this.m_textbox.setPosition(cc.p(150,0));
        this.m_textbox.setColor(new cc.Color3B(255, 255, 255));
        this.addChild(this.m_textbox);

        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);

        return true;
	},
	onExit:function () {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        this._super();
    },
    containsTouchLocation:function (touch) {
        var getPoint = touch.getLocation();
        var myRect = this.rect();

        myRect.origin.x += this.getPosition().x;
        myRect.origin.y += this.getPosition().y;
        return cc.Rect.CCRectContainsPoint(myRect, getPoint);//this.convertTouchToNodeSpaceAR(touch));
    },

    onTouchBegan:function (touch, event) {
       // if (this._state != PADDLE_STATE_UNGRABBED) return false;
        if (!this.containsTouchLocation(touch)) return false;

        //this._state = PADDLE_STATE_GRABBED;
        return true;
    },
    onTouchMoved:function (touch, event) {
        // If it weren't for the TouchDispatcher, you would need to keep a reference
        // to the touch from touchBegan and check that the current touch is the same
        // as that one.
        // Actually, it would be even more complicated since in the Cocos dispatcher
        // you get CCSets instead of 1 UITouch, so you'd need to loop through the set
        // in each touchXXX method.
        //cc.Assert(this._state == PADDLE_STATE_GRABBED, "Paddle - Unexpected state!");

        var touchPoint = touch.getLocation();
        //touchPoint = cc.Director.getInstance().convertToGL( touchPoint );

        this.setPosition(cc.p(touchPoint.x, this.getPosition().y));
    },
    onTouchEnded:function (touch, event) {
        //cc.Assert(this._state == PADDLE_STATE_GRABBED, "Paddle - Unexpected state!");
        //this._state = PADDLE_STATE_UNGRABBED;
    },
    
    touchDelegateRetain:function () {
    },
    
    touchDelegateRelease:function () {
    },

	getZOrder:function(){
		return 1;
	},

	getTag:function(){
		return 11323423;
	}

});
