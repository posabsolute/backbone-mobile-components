var Menu = Backbone.MobileMenuView.extend({
    events:{
         // when we click a menu item we navigate to a page
        "click a"   : "navigate",
    },
    initialize : function(){

    },
    className:"fullMenu",
    navigate: function(e) {
        e.preventDefault();
        // when we change page we want to hide the menu
        this.hideMenu();
        // need to find a better way to call the router
        thisRouter.navigate($(e.currentTarget).attr("href"), {
            trigger: true
        });
    },
    render: function(data) {
        var self = this;
        var locals ={};
        this.$el.css("height", $(window).height());
        this.$el.html(this.template({data:locals}));
        return this;
    }
});
