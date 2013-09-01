var s_HelloWorld = "res/HelloWorld.png";
var s_CloseNormal = "res/CloseNormal.png";
var s_CloseSelected = "res/CloseSelected.png";

var g_ressources = [
    //image
    {type:"image", src:s_HelloWorld},
    {type:"image", src:s_CloseNormal},
    {type:"image", src:s_CloseSelected},

    {type:"image", src:"res/MainMenuScene/bg.png"},
    {type:"image", src:"res/MainMenuScene/welback.png"},
    {type:"image", src:"res/MainMenuScene/UIPlay.png"},
    {type:"image", src:"res/MainMenuScene/UIPlaySelected.png"},

    {type:"image", src:"res/PlayScene/top_lvexp00.png"},
    {type:"image", src:"res/PlayScene/top_cash.png"},
    {type:"image", src:"res/PlayScene/top_cash_p.png"},
    {type:"image", src:"res/PlayScene/top_coin.png"},
    {type:"image", src:"res/PlayScene/top_coin_p.png"},
    {type:"image", src:"res/PlayScene/top_pop.png"},
    {type:"image", src:"res/PlayScene/top_pop_p.png"},
    {type:"image", src:"res/PlayScene/top_sp.png"},
    {type:"image", src:"res/PlayScene/top_sp_p.png"},

    {type:"image", src:"res/PlayScene/next.png"},
    {type:"image", src:"res/PlayScene/next_p.png"},
    {type:"image", src:"res/PlayScene/prev.png"},
    {type:"image", src:"res/PlayScene/prev_p.png"},
    {type:"image", src:"res/PlayScene/map/outline.png"},

    {type:"image", src:"res/PlayScene/ground.png"},   
    {type:"image", src:"res/PlayScene/3002_3iPhone.png"},
    {type:"image", src:"res/PlayScene/3002_4iPhone.png"},
    {type:"image", src:"res/PlayScene/base.png"},
    {type:"image", src:"res/PlayScene/bgtileset.png"},
    {type:"image", src:"res/PlayScene/tiles_ground.png"},
    {type:"image", src:"res/PlayScene/tiles_tree.png"},

    {type:"image", src:"res/PlayScene/map/base.png"},
    {type:"image", src:"res/PlayScene/map/transparent.png"},
    {type:"image", src:"res/PlayScene/map/tileset.png"},

    // tile
    {type:"image", src:"res/PlayScene/map/0/0.png"}, 
    {type:"image", src:"res/PlayScene/map/0/1.png"}, 
    {type:"image", src:"res/PlayScene/map/0/2.png"}, 
    {type:"image", src:"res/PlayScene/map/0/3.png"}, 
    {type:"image", src:"res/PlayScene/map/0/4.png"}, 
    {type:"image", src:"res/PlayScene/map/0/5.png"}, 
    {type:"image", src:"res/PlayScene/map/0/6.png"}, 
    {type:"image", src:"res/PlayScene/map/0/7.png"}, 

    // house
    {type:"image", src:"res/UIItem/house/building_0.png"}, 
    {type:"image", src:"res/UIItem/house/building_1.png"}, 
    {type:"image", src:"res/UIItem/house/map_0.png"}, 
    {type:"image", src:"res/UIItem/house/map_1.png"}, 
    {type:"image", src:"res/UIItem/house/map_2.png"}, 
    {type:"image", src:"res/UIItem/house/map_3.png"}, 
    {type:"image", src:"res/UIItem/house/map_4.png"},
    {type:"image", src:"res/UIItem/house/map_5.png"},
    {type:"image", src:"res/UIItem/house/map_6.png"},
    {type:"image", src:"res/UIItem/house/map_7.png"},
    {type:"image", src:"res/UIItem/store_greenbutton.png"},

    // ui
    {type:"image", src:"res/UIItem/UI0.png"},
    {type:"image", src:"res/UIItem/UI1.png"},
    {type:"image", src:"res/UIItem/UI2.png"},
    {type:"image", src:"res/UIItem/UI3.png"},
    {type:"image", src:"res/UIItem/UI4.png"},
    {type:"image", src:"res/UIItem/UI5.png"},
    {type:"image", src:"res/UIItem/UI6.png"},
    {type:"image", src:"res/UIItem/UI7.png"},
    {type:"image", src:"res/UIItem/UI8.png"},
    {type:"image", src:"res/UIItem/UI9.png"},
    {type:"image", src:"res/UIItem/plus.png"},
    {type:"image", src:"res/UIItem/minus.png"},

    {type:"image", src:"res/item_info.png"},
    {type:"image", src:"res/PlayScene/map/outline.png"},

    // move
    {type:"image", src:"res/Unit/help.png"},
    {type:"image", src:"res/Unit/move.png"},
    {type:"image", src:"res/Unit/distort.png"},
    {type:"image", src:"res/Unit/gather.png"},
    {type:"image", src:"res/Unit/chop.png"},
    {type:"image", src:"res/Unit/kick.png"},
    {type:"image", src:"res/Unit/open.png"},

    {type:"image", src:"res/Unit/help_f.png"},
    {type:"image", src:"res/Unit/move_f.png"},
    {type:"image", src:"res/Unit/distort_f.png"},
    {type:"image", src:"res/Unit/gather_f.png"},
    {type:"image", src:"res/Unit/chop_f.png"},
    {type:"image", src:"res/Unit/kick_f.png"},
    {type:"image", src:"res/Unit/open_f.png"},
    
    //plist
    {type:"plist", src:"res/Unit/help.plist"},
    {type:"plist", src:"res/Unit/move.plist"},
    {type:"plist", src:"res/Unit/distort.plist"},
    {type:"plist", src:"res/Unit/gather.plist"},
    {type:"plist", src:"res/Unit/chop.plist"},
    {type:"plist", src:"res/Unit/kick.plist"},
    {type:"plist", src:"res/Unit/open.plist"},

    {type:"plist", src:"res/Unit/help_f.plist"},
    {type:"plist", src:"res/Unit/move_f.plist"},
    {type:"plist", src:"res/Unit/distort_f.plist"},
    {type:"plist", src:"res/Unit/gather_f.plist"},
    {type:"plist", src:"res/Unit/chop_f.plist"},
    {type:"plist", src:"res/Unit/kick_f.plist"},
    {type:"plist", src:"res/Unit/open_f.plist"},

    //fnt

    //tmx
    {type:"tmx", src:"res/PlayScene/ground01.tmx"},
    {type:"tmx", src:"res/PlayScene/ground02.tmx"},
    {type:"tmx", src:"res/PlayScene/ground03.tmx"},
    {type:"tmx", src:"res/PlayScene/map/map1.tmx"},

    //bgm

    //effect
];
