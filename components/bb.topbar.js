/**
 * Backbone.MobileTopbarView
 * 
 * Creates a fixed top toolbar buth buttons and page title
 */
Backbone.MobileTopbarView = Backbone.View.extend({
    events: {
        "click .btnmenu": "loadMenu",
        // Load actions dictated by the button creator
        "click .btnMenuRight": "loadMenuAction",
        "click .subMenuItem": "loadSubMenuAction"
    },
    initialize: function() {
        var self = this;

        this.template = _.template($("#topbar_tpl").html());
        //right side button events, can add or delete
        this.listenTo(this, "removeActionBtn", this.removeActionBtn);
        this.listenTo(this, "loadActionBtn", this.actionBtn);
    },
    id: "topbar",
    render: function(data) {
        var self = this;
        var locals = {
            // we need a title, even if it empty
            title: (data && data.title) ? data.title : ""
        };
        // set html to our topbar
        this.$el.html(this.template({
            data: locals
        }));
        return this;
    },
    // we change title generally when there is a page change but you can call it at anytime
    changeTitle: function(title, noAnim) {
        var $title = this.$el.find(".text");
        // first we hide it
        Backbone.bbanimate.go({
            to:$title,
            attrs : {"opacity": 0, "marginLeft": "-40px"},
            noAnim : noAnim,
            onComplete: function() {
                // change title replace it
                $title.html(title).css("marginLeft", "40px");
                // show title back
                Backbone.bbanimate.go({
                    to:$title,
                    attrs : {"opacity": 1, "marginLeft": "0px"}
                });
            }
        });
        $(".btnmenuRight").remove();
    },
    // if the menu component is active when clicking on the buttong show or hide the menu accordingly
    loadMenu: function(e) {
        e.preventDefault();
        if(this.options.menu){
            $button = this.$el.find(".btnmenu");
            if ($button.hasClass("active")) {
                $button.removeClass("active");
                this.options.menu.trigger("hideMenu");
            } else {
                $button.addClass("active");
                this.options.menu.trigger("showMenu");
            }           
        }
    },
    // add a button to the right
    actionBtn: function(options) {
        $(".btnMenuRight").remove();
        // add a button to the right
        this.subMenuItems = (options.subMenuItems) ? options.subMenuItems : undefined;
        this.actionBtnExecute = (options.action) ? options.action : undefined;

        this.$el.find('.topbarContainer').append("<a href='#' class='icon btnMenuRight right'>" + options.icon + "</a>");
        this.delegateEvents();
    },
    removeActionBtn: function() {
        $(".btnMenuRight").remove();
    },
    // eecute menu action when button is pushed
    loadMenuAction: function(e) {
        e.preventDefault();
        if (this.subMenuItems) {
            this.showHideSubmenu();
        } else {
            if (this.actionBtnExecute) this.actionBtnExecute();
        }
    },
    // is there is multiple actions for one button show a submenu when button is clicked
    showHideSubmenu: function() {
        if (!this.$el.find(".submenu").length) {
            // prepare for animation
            var $menu = $("<div class='submenu'></div>").css("opacity", 0);
            // load each item in submenu
            _.each(this.subMenuItems, function(item, i) {
                $menu.append("<a href='#' class='subMenuItem itemSub" + item.oid + "' data-oid=" + item.oid + ">" + item.name + "</a>");
            });
            // add menu
            this.$el.find('.topbarContainer').append($menu);
            // show menu
            Backbone.bbanimate.go({
                to:$menu,
                speed: 0.25,
                attrs : {"opacity": 1}
            });
        } else {
            // if the menu is already open, hide it
            this.$el.find(".submenu").remove();
        }
    },
    // is there is multiple actions for one button load a submenu
    loadSubMenuAction: function(e) {
        e.preventDefault();
        var $item = $(e.currentTarget);
        var oid = $item.attr("data-oid");
        if (this.subMenuItems[oid]) this.subMenuItems[oid].action();
        this.showHideSubmenu();
    }
});