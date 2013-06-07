var myrouter =Backbone.Router.extend({

    routes: {
        "page1" :  "page1",
        "page2" :  "page2",
        "page3" :  "page3",
        "page4" :  "page4",
        ""      :  "page1"
    },
    page1: function(){
        var page = new appmobile.views.page({
            topbar : mytopbar,
            menu : mymenu,
            title : "Page1",
        });
        $("#overflower").append(page.render().el);
    },
    page2: function(){
        var page = new appmobile.views.page({
            topbar : mytopbar,
            menu : mymenu,
            title : "Page1",
        });
        $("#overflower").append(page.render().el);
    },
    page3: function(){
        var page = new appmobile.views.page({
            topbar : mytopbar,
            menu : mymenu,
            title : "Page1",
        });
        $("#overflower").append(page.render().el);
    },
    page4: function(){
        var page = new appmobile.views.page({
            topbar : mytopbar,
            menu : mymenu,
            title : "Page1",
        });
        $("#overflower").append(page.render().el);
    }
});