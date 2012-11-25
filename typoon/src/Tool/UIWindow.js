// node -> setTouchenabled가 불가능
var G_UIWINDOW_TAG = 1234324;

gg.UIWindow = cc.Node.extend({
	m_uicomps:null,
 	rect:function () {
        return cc.rect(-this._rect.size.width / 2, -this._rect.size.height / 2, this._rect.size.width, this._rect.size.height);
    },

	ctor:function() {
		this._super();
         console.log("UIWindow.ctor()");

         // init
        this.m_uicomps = [];
 	},	

    createComponent:function() {
        
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

        // var fontMenu = cc.MenuItemFont.create("Test", this, function() {

        //     console.log("this attack");

        // });
        // fontMenu.setPosition(cc.p(150,150));
        // //this.addChild(fontMenu, 1, 134343432);

        // Label Name
        var label = gg.UIComponentBase.create("Name", "Arial", 12);
        label.setType("Label");
        label.setPosition(cc.p(0,0));
        label.setColor(new cc.Color3B(255, 255, 255));
        
        this.m_uicomps.push(label);

        console.log("UIWindow - child");
        console.log(this.m_label);

        // Image Box
        var imagebox = gg.UIComponentBase.create("TextBox","Arial", 12);
        imagebox.setType("TextBox");
        imagebox.setImage("res/PlayScene/top_lvexp00.png");
        imagebox.setPosition(cc.p(120,20));
        imagebox.setString("ImageBox");
        imagebox.setColor(new cc.Color3B(255, 255, 255));

        this.m_uicomps.push(imagebox);

        
        var imageLabel = gg.UIComponentBase.create("TextBox","Arial", 12);
        imageLabel.setType("TextBox");
        imageLabel.setImage("res/PlayScene/top_cash.png");
        imageLabel.setPosition(cc.p(200,50));
        imageLabel.setString("ImageBox");
        imageLabel.setColor(new cc.Color3B(255, 255, 255));

        this.m_uicomps.push(imageLabel);

        // textBox
        var textbox = gg.UIComponentBase.create("TextBox","Arial", 12);
        textbox.setType("TextBox");

        textbox.setPosition(cc.p(0,60));
        textbox.setString("Type");
        textbox.setColor(new cc.Color3B(255, 255, 255));
        
        
        this.m_uicomps.push(textbox);

    },

	onEnter:function() {
		this._super();
        //this.setAnchorPoint(cc.p(0,0));
        this.createComponent();

        // add ui components to render.
        var arraySize = this.m_uicomps.length;
        for(var i = 0; i < arraySize; i++) {
            var comps = this.m_uicomps[i];
            this.addChild( comps ); 
        }

        
        //this.addChild(this.m_uicomps);
        // Example 1
        // Type                Label ( read only )
        // Name                "Label#1"

        // 
        // Type                TextBox ( read / write )

        // Example 2
        // Type                Button ( click event )

        // Example 3
        // Type                Window ( container )

        // Example 4
        // Type                Building ( click event )

        // Example 5
        // Type                

    
        return true;
	},
	onExit:function () {
      
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
        console.log("onTouchBegan " );
       // if (!this.containsTouchLocation(touch)) return false;
        console.log("end --- " + "Began");

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
        // cc.Rect
        // cc.Rect.CCRectContainsPoint(rect, )

    
        //var touchPoint = cc.Director.getInstance().convertToGL( touchPoint )
        //console.log(touchPoint);
        //
        
        //if( this.m_label.getBoundingBox().)
        //this.setPosition(cc.p(touchPoint.x, this.getPosition().y));
        
        // console.log("this's object");
        // console.log(this);

        // //console.log("boundingBoxes------");
        // for(var i = 0; i < boxSize; i++) {
        //     var boundingBox = boundingBoxs[i]; 
        //    // console.log(boundingBox);
        //    // console.log(touchPoint);

        //     if( cc.Rect.CCRectContainsPoint( boundingBox, touchPoint ) == true )
        //     {
        //         menuObj[i].setPosition( this.convertToNodeSpace(touchPoint) );
        //         //this.setPosition(touchPoint);
        //         //console.log(touchPoint);
        //         //console.log(boundingBox);
        //     }
        // }
        //console.log("end of boundingBoxes------");
       
    },
    onTouchEnded:function (touch, event) {
        console.log("onTouchEnded");

        this.setPosition
        var touchPoint = touch.getLocation();
        var boundingBox = this.m_textbox.getBoundingBox();
        
        console.log(touchPoint);
        console.log(boundingBox);
        var Rect = cc.Rect;

        // if( Rect.CCRectContainsPoint( boundingBox, touchPoint ) == true )
        // {
        //     var label = this.m_label;
        //     console.log("label moved");
        //     console.log(label);
        //     label.setPosition( touchPoint );
        // }

        //this.setPosition( touchPoint );

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
		return G_UIWINDOW_TAG;
	}

});
