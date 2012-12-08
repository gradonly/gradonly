/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
(function () {
    var d = document;
    var c = {
        menuType:'canvas', //whether to use canvas mode menu or dom menu
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk:false,
        showFPS:true,
        frameRate:60,
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'../cocos2d/',
        //SingleEngineFile:'',
        appFiles:[

            // 'src/cereal/lib/cereal.js',
            'src/JSON2/json2.js',
            'src/JSONfn/jsonfn.js',
            // 'src/JSON2/json2.js',
            'src/JSON2/json_parse.js',
            'src/JSON2/json_parse_state.js',
            'src/JSON2/cycle.js',

            'src/resource.js',
            'src/graph.js',
            'src/astar.js',
            'src/Unit.js',
            'src/house.js',
            'src/localstorage.js',
            // 'src/TypoonEngineIntroScene.js',
            // 'src/MenuItemImageMapLeft.js',
            'src/Tool/TextField.js',
            'src/Tool/Char/CharToolScene.js',

            'src/Tool/Play/MainMenuScene.js',
            'src/Tool/Play/PlayScene.js',
            
            'src/Tool/Map/MapToolScene.js',

            'src/Tool/UIComponent/UIComponent.js',
            'src/Tool/UIPlacement/UIPlacement.js',
            'src/Tool/UIWindow/UIWindow.js',

            // 'src/Tool/UI/ItemToolScene.js',
            // 'src/Tool/UI/UIWindow.js',
            // 'src/Tool/UI/UIComponentBase.js',
            // 'src/Tool/UI/UIComponentLabel.js',
            // 'src/Tool/UI/UIComponentImage.js'
            
        ]
    };
    window.addEventListener('DOMContentLoaded', function () {
        var s = d.createElement('script');
        console.log("onloaded - dom content loadede");
        console.log("c.engineDir : " + c.engineDir);
        console.log("c.SingleEngineFile : " + c.SingleEngineFile);

        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
            console.log('jsloader if uppper clause');
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            //s.src = c.engineDir + 'platform/jsloader.js';
            console.log("jsLoader " + g_platformLoader);
            s.src = c.engineDir + g_platformLoader;
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/

            //s.src = 'Packed_Release_File.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        d.body.appendChild(s);
        // d.body.appendChild(s);
        // s.c = c;
        // s.id = 'cocos2d-html5';
        // //else if single file specified, load singlefile
    });
})();
