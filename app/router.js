var Myrouter =Backbone.Router.extend({

    routes: {
        "page1" :  "page1",
        "page2" :  "page2",
        "page3" :  "page3",
        "page4" :  "page4",
        "*path" :  "page1"
    },
    before: {
        // Using inline filter definition
        '*any': function(fragment, args) {
            this.addBars();
        }
    },
    page1: function(){
        var page = new Page({
            topbar : mytopbar,
            menu : mymenu,
            title : "Page1",
        }).render();
    },
    page2: function(){
        var page = new Page({
            topbar : mytopbar,
            menu : mymenu,
            title : "Page2",
        }).render();
    },
    page3: function(){
        var page = new Page({
            topbar : mytopbar,
            menu : mymenu,
            title : "Page3",
        }).render();
    },
    page4: function(){
        var page = new Page({
            topbar : mytopbar,
            menu : mymenu,
            title : "Page4",
        }).render();
    },
    addBars : function (title) {
        if(!window.mytopbar){
            mymenu = new Menu();
            mytopbar = new Topbar({
                menu : mymenu
            });

            $("#overflower")
                .append(mymenu.render().el)
                .append(mytopbar.render().el);           
        }
     }
});

var thisRouter = new Myrouter();