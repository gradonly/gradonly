var TEXT_INPUT_FONT_NAME = "Thonburi";
var TEXT_INPUT_FONT_SIZE = 12;


gg.textInputGetRect = function (node) {
    var rc = cc.rect(node.getPosition().x, node.getPosition().y, node.getContentSize().width, node.getContentSize().height);
    rc.origin.x -= rc.size.width / 2;
    rc.origin.y -= rc.size.height / 2;
    return rc;
};

//////////////////////////////////////////////////////////////////////////
// KeyboardNotificationLayer for test IME keyboard notification.
//////////////////////////////////////////////////////////////////////////
gg.KeyboardNotificationLayer = cc.Layer.extend({
    _pTrackNode:null,
    _beginPos:null,
    _message:null,
    _pTrackNodePos:null,
    ctor:function (message, pos) {
        this.setTouchEnabled(true);
        this._message = message;
        this.setAnchorPoint(cc.p(0.5,0.5));
        this._pTrackNodePos = pos;
    },
    onClickTrackNode:function (clicked) {
    },

    registerWithTouchDispatcher:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, false);
    },
    onTouchBegan:function (touch, event) {
        cc.log("++++++++++++++++++++++++++++++++++++++++++++");
        this._beginPos = touch.getLocation();
        this._beginPos = cc.Director.getInstance().convertToGL(this._beginPos);
        //this._beginPos = this.convertToNodeSpace(this._beginPos);
        return true;
    },

    onTouchEnded:function (touch, event) {
        if (!this._pTrackNode) {
            return;
        }

        var endPos = touch.getLocation();
        endPos = cc.Director.getInstance().convertToGL(endPos);
        //endPos = this.convertToNodeSpace(endPos);

        var delta = 5.0;
        if (Math.abs(endPos.x - this._beginPos.x) > delta
            || Math.abs(endPos.y - this._beginPos.y) > delta) {
            // not click
            this._beginPos.x = this._beginPos.y = -1;
            return;
        }

        // decide the trackNode is clicked.
        var point = this.convertTouchToNodeSpaceAR(touch);
        point.y *= 2;
        point.y += 6;

        //var point = endPos;
        cc.log("KeyboardNotificationLayer:clickedAt(" + point.x + "," + point.y + ")");

        var rect = gg.textInputGetRect(this._pTrackNode);
        cc.log("KeyboardNotificationLayer:TrackNode at(origin:" + rect.origin.x + "," + rect.origin.y
            + ", size:" + rect.size.width + "," + rect.size.height + ")");

        this.onClickTrackNode(cc.Rect.CCRectContainsPoint(rect, point));
        cc.log("----------------------------------");
    }
});
/*
cc.Rect.CCRectContainsPoint = function (rect, point) {
    var ret = false;
    if (point.x >= cc.Rect.CCRectGetMinX(rect) && point.x <= cc.Rect.CCRectGetMaxX(rect)
        && point.y >= cc.Rect.CCRectGetMinY(rect) && point.y <= cc.Rect.CCRectGetMaxY(rect)) {
        ret = true;
    }
    return ret;
};
*/
//////////////////////////////////////////////////////////////////////////
// TextFieldTTFDefaultTest for test TextFieldTTF default behavior.
//////////////////////////////////////////////////////////////////////////
gg.TextFieldTTFDefault = gg.KeyboardNotificationLayer.extend({
    onClickTrackNode:function (clicked) {
        var textField = this._pTrackNode;
        console.log(clicked);
        if (clicked) {
            // TextFieldTTFTest be clicked
            cc.log("TextFieldTTFDefaultTest:CCTextFieldTTF attachWithIME");
            textField.attachWithIME();
        }
        else {
            // TextFieldTTFTest not be clicked
            cc.log("TextFieldTTFDefaultTest:CCTextFieldTTF detachWithIME");
            textField.detachWithIME();
        }
    },
    onEnter:function () {
        this._super();

        var s = cc.Director.getInstance().getWinSize();

        var textField = cc.TextFieldTTF.create("<click here for input>",
            TEXT_INPUT_FONT_NAME,
            TEXT_INPUT_FONT_SIZE);
        this.addChild(textField);

        console.log(s);
        textField.setPosition(cc.p(this._pTrackNodePos));

        this._pTrackNode = textField;
    }
});
