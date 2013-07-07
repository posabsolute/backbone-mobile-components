


describe("Backbone.MobileTopbar", function() {
    var Topbar,mytopbar;
    jQuery(document).ready(function($) {
        $("body").append('<script id="topbar_tpl" type="text/template">\
                <div class="topbarContainer">\
                    <a class="icon btnmenu" href="#"><span class="icon_menu"></span></a>\
                    <span class="text">Page title</span>\
                </div>\
            </script>');
     
        Topbar = Backbone.MobileTopbarView.extend({});
        mytopbar = new Topbar({});
    });

    window.testTopbarAction = {
        action1 : function(){},
        action2 : function(){}
    };

    it("Topbar should exist after rendering & pushed into body", function() {
        $("body").append(mytopbar.render().el);
        expect($(".topbarContainer")).toExist();     
    });

    it("changeTitle() should change the title", function() {
        mytopbar.changeTitle("test", true);
        var content = $(".topbarContainer").find(".text").html();
        expect(content).toEqual("test");
    });

    it("loadActionBtn() should add a button to topbar", function() {
        mytopbar.trigger("loadActionBtn", {
            icon : "<span class='icon_plus'>a</span>",
            action : function () {
                testTopbarAction.action1();
            }
        });
        expect($(".topbarContainer").find(".icon_plus")).toExist();
    });

    it("Click on menu button should call action", function() {
        spyOn(testTopbarAction, 'action1').andCallThrough();
        $( '.btnMenuRight' ).trigger( 'click' );
         expect(testTopbarAction.action1).toHaveBeenCalled();
    });


    it("loadSubMenuAction  should add a button to topbar with a sub menu", function() {
        mytopbar.trigger("loadActionBtn", {
            icon : "<span class='icon_plus2'>a</span>",
            subMenuItems : {
                item1 : {
                    oid : "item1",
                    name : "item1",
                    action : function(){
                        testTopbarAction.action2();
                    }
                },
                item2 : {
                    oid : "item2",
                    name : "item2",
                    action : function(){
                        testTopbarAction.action2();
                    }
                }
            }
        });
        expect($(".topbarContainer").find(".icon_plus2")).toExist();
    });

    it("Click on menu button should call submenu", function() {
        spyOn(testTopbarAction, 'action2').andCallThrough();
        spyOn(mytopbar, 'showHideSubmenu').andCallThrough();

        $( '.btnMenuRight' ).trigger( 'click' );

        expect($(".itemSubitem1")).toExist();
        expect($(".submenu")).toExist();

        $( '.itemSubitem1' ).trigger( 'click' );

        expect(mytopbar.showHideSubmenu).toHaveBeenCalled();
        expect(testTopbarAction.action2).toHaveBeenCalled();
    });
});
























