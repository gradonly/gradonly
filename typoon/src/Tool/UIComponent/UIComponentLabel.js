// UI Component Label
// Node는 그리지 않음.(not draw)
// UIComponentTextBox
// 기존 레이블의 기능을 이용
// 텍스트 입력을 받을 수 있게 함.(따로 텍스트 저장소 필요)
gg.UIComponentLabel = gg.UIComponentBase.extend({
	m_label:null,
	ctor:function() {
		this._super();
		m_identity = "UIComponentImage";
		console.log("UIComponentImage ctor called");

		m_label = cc.LabelTTF.create("test", "arial", 12);

	},

	setPosition:function(pos) {
		console.log("pos");
		console.log(pos);

		this._super(pos);
		if( this.m_label != null) {
			this.m_label.setPosition( pos );
		}

	},

	onEnter:function() {
		this._super();
		cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, false);

		console.log("onEnter start");
				
		return true;
	},

	onExit:function() {
		cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
	},

	onTouchBegan:function (touch, event) {
        console.log(this._type + " UI onTouchBegan");
		console.log(touch);

        return true;
    },
    onTouchMoved:function (touch, event) {
    	// touch는 절대 좌표다.
    	console.log(touch);
    	var touchPoint = touch.getLocation();
    	//var touchPoint = this.convertToWorldSpace(touch.getLocation());
    	var boundingBox = this.m_label.getBoundingBoxToWorld();

     	if( cc.Rect.CCRectContainsPoint( boundingBox, touchPoint ) == true )
        {
           var parent = this.getParent();
           this.setPosition( parent.convertToNodeSpace(touchPoint) );
                //this.setPosition(touchPoint);
        }

      //console.log(this._type + "UI onTouchMoved");

    },
    onTouchEnded:function (touch, event) {
        console.log(this._type + "UI onTouchEnded");
    },
    
    touchDelegateRetain:function () {
    },
    
    touchDelegateRelease:function () {
    },

	// 반드시 추가를 해야함
	getZOrder:function(){
		return 1;
	},

	getTag:function(){
		return 113234232;
	},
	draw:function(ctx) {
		// image 
		this._super(ctx);

		if( this.m_label != null ) {
		 	this.m_image.draw(ctx);
		}else { //
			
		}
	},
	setType:function(type) {
		this._type = type;
	}

});


// factory method.
// 함수의 arguments 는 배열이 아니다.  객체다.

gg.UIComponentLabel.create = function() {

	var ret = new gg.UIComponentLabel();
	
	if(ret.initWithString(arguments)) {
		if( arguments.length > 3 )
			ret.setType(arguments[3]);
		return ret;
	}

	return null;
}



