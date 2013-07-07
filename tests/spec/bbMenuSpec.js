


describe("Backbone.MobileMenu", function() {
    var Menu,mymenu;
    jQuery(document).ready(function($) {
            $("body").append('<script id="menu_tpl" type="text/template">\
            <div class="menuContent">\
                <a class="item btnContacts" href="/page1">\
                    <span class="text">Page 1</span>\
                </a>\
                <a class="item btnDrafts" href="/page2">\
                    <span class="text">Page 2</span>\
                </a>\
            </div>\
        </script>');
     
        Menu = Backbone.MobileMenuView.extend({});
        mymenu = new Menu();
    });

    it("Topbar should exist after rendering & pushed into body", function() {
        $("body").append(mymenu.render().el);
        expect($(".menuContent")).toExist();     
    });

    it("showMenu() should show the menu", function() {
        runs(function() {
            flag = false;
            mymenu.showMenu({
                onComplete : function(){  flag= true; }
            });
        }); 
         
        waitsFor(function() {
            return flag;
        });

        runs(function () {
            expect($(".menuContent")).toBeVisible();
        });

    });

    it("hideMenu() should hide the menu", function() {

        runs(function() {
            flag = false;
            mymenu.hideMenu({
                onComplete : function(){ flag= true; }
            });
        }); 
         
        waitsFor(function() {
            return flag;
        });

        runs(function () {
            expect($(".menuContent")).toBeHidden();
        });
    });
});
























