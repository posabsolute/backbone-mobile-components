


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
        action1 : function(){}
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
});

