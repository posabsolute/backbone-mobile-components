/**
 * Backbone.MobileMenuView
 * 
 * Let you create a side action menu
 */

Backbone.MobileMenuView = Backbone.View.extend({
    events: {

    },
    // can be overrided
    defaults : {
        speed:0.4,
        width:"100px",
        templateId :"#menu_tpl"
    },
    initialize: function(params) {
        var self = this;
        this.options = $.extend({}, this.defaults, this.options);
        this.template = _.template($(this.options.templateId).html());
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
    showMenu: function(op) {
        // flags up
        this.isOpened = true;
        // put an active state to menu button in the toolbar
        $(".btnmenu").addClass("active");
        this.$el.css("display", "block");
        // call animation util, 
        Backbone.bbanimate.go({
            to:$(".currentMobilePage,#topbar"),
            attrs : {marginLeft: this.options.width},
            ease:Power2.easeInOut,
            onComplete : (op && op.onComplete) ? op.onComplete() : false
        });
    },
    hideMenu: function(op) {
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
                if(op && op.onComplete) { op.onComplete(); }
            }
        });
    }
});