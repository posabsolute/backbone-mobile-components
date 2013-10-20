describe("Backbone.MobilePopin", function() {

    it("Popin shoud call beforeRender before rendering", function() {

        runs(function() {
            flag = false;

            var Popin = Backbone.MobilePopin.extend({
                events:{
                },
                beforeRender : function () {
                   flag = true;
                }
            });

            var popup = new Popin({
                content : "<div></div>"
            }).render();
        }); 
         
        waitsFor(function() {
            return flag;
        });

    });
    it("Popin shoud call afterRender after rendering", function() {
        runs(function() {
            flag = false;

            var Popin = Backbone.MobilePopin.extend({
                events:{
                },
                afterRender : function () {
                    flag = true;
                }
            });

            var popup = new Popin({
                content : "<div id='testpopup'></div>"
            }).render();
        }); 
         
        waitsFor(function() {
            return flag;
        });

    });
    it("Popin shoud exist after rendering", function() {
        runs(function() {
            flag = false;

            var Popin = Backbone.MobilePopin.extend({
                events:{
                },
                afterRender : function () {
                   if($("#testpopup").length) flag = true;
                }
            });

            var popup = new Popin({
                content : "<div id='testpopup'></div>"
            }).render();
        }); 
         
        waitsFor(function() {
            return flag;
        });

    });
    it("Popin shoud not exist after hide", function() {
        runs(function() {
            flag = false;

            var Popin = Backbone.MobilePopin.extend({
                events:{
                },
                afterRender : function () {
                   this.hide(undefined, function(){ 
                    if(!$("#testpopuphide").length) flag = true;
                   });
                }
            });

            var popup = new Popin({
                content : "<div id='testpopuphide'></div>"
            }).render();
        }); 
         
        waitsFor(function() {
            return flag;
        });

    });

});