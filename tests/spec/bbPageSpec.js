


describe("Backbone.MobilePage", function() {
    var Page,mypage;
    jQuery(document).ready(function($) {
        $("body").append('<script id="page_template" type="text/template"><div id="page">This is a page</div></script>');
        Page = Backbone.MobilePageView.extend({
            render: function(data) {
                this.template = _.template($("#page_template").html());
                this.$el.html(this.template({data:{}}));
                return this;
            }
        });
        mypage = new Page();
    });

    it("Page should exist after rendering it", function() {
        $("body").append(mypage.render().el);
        expect($("#page")).toExist();     
    });

    it("show() should show the page", function() {
        runs(function() {
            flag = false;
            mypage.show({
                complete : function(){  flag= true; }
            });
        }); 
         
        waitsFor(function() { return flag; });

        runs(function () {
            expect($("#page")).toBeVisible();
        });

    });

    it("hide() should hide the menu", function() {

        runs(function() {
            flag = false;
            mypage.hide({
                complete : function(){ flag= true; }
            }, Backbone.currentMobilePage);
        }); 
         
        waitsFor(function() { return flag; });

        runs(function () {
            expect($("#page")).toHaveLength(0);
        });
    });
});
























