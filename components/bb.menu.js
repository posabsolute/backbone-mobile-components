/**
 * Backbone.MobileMenuView
 * 
 * Let you create a side action menu
 */

Backbone.MobileMenuView = Backbone.View.extend({
    events: {
        // when we click a menu item we navigate to a page
        "click a"   : "navigate",
    },
    // can be overrided
    defaults : {
        speed:0.4,
        width:"100px"
    },
    initialize: function() {
        var self = this;
        this.template = _.template($("#menu_tpl").html());
        // Any view can call events to show or hide the menu
        this.listenTo(this, "showMenu", this.showMenu);
        this.listenTo(this, "hideMenu", this.hideMenu);
    },
    className: "fullMenu",
    render: function(data) {
        var self = this;
        var locals = {};
        // we need to get the window full height
        this.$el.css("height", $(window).height());
        this.$el.html(this.template({
            data: locals
        }));
        return this;
    },
    /* MENU ANIMS */
    isOpened: false,
    showMenu: function() {
        // flags up
        this.isOpened = true;
        // put an active state to menu button in the toolbar
        $(".btnmenu").addClass("active");
        this.$el.css("display", "block");
        // call animation util, 
        Backbone.bbanimate.go({
            to:$(".currentMobilePage,#topbar"),
            attrs : {marginLeft: this.defaults.width},
            ease:Power2.easeInOut
        });
    },
    hideMenu: function() {
        var self = this;
        // flags down
        this.isOpened = false;
        $(".btnmenu").removeClass("active");
        // call animation util, 
        Backbone.bbanimate.go({
            to:$(".currentMobilePage,#topbar"),
            attrs : {marginLeft: "0px"},
            ease:Power2.easeInOut,
            onComplete: function() {
                self.$el.css("display", "none");
            }
        });
    },
    navigate: function(e) {
        e.preventDefault();
        // when we change page we want to hide the menu
        this.hideMenu();
        // need to find a better way to call the router
        appmobile.routing.navigate($(e.currentTarget).attr("href"), {
            trigger: true
        });
    }
});