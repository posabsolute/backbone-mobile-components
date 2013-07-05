describe("Backbone.bbanimate", function() {
    describe("Backbone.bbanimate.go()", function() {
        it("Go should not use anim when passed noAnim", function() {
            $("body").append("<div class='example2' style='opacity:0;'></div>");

            Backbone.bbanimate.go({
                to:$(".example2"),
                speed:0.35,
                noAnim : true,
                attrs : {scale: 1, opacity:1},
                onComplete: function() {
                   flag = true;
                }
            });
            var opacity = $(".example2").css("opacity");
            expect(opacity).toEqual("1");
        });

        it("Go should call complete when passed into param", function() {
            $("body").append("<div class='example'></div>");
            runs(function() {
                flag = false;
                Backbone.bbanimate.go({
                    to:$(".example")[0],
                    speed:0.35,
                    attrs : {scale: 1, opacity:1},
                    onComplete: function() {
                       flag = true;
                    }
                });
            }); 
             
            waitsFor(function() {
                return flag;
            });
        });
        
        it("go should modify css element", function() {
            runs(function() {
                flag = false;
                $("body").append("<div class='example3' style='opacity:0;'></div>");

                Backbone.bbanimate.go({
                    to:$(".example3"),
                    speed:0.35,
                    attrs : {opacity:1},
                    onComplete: function() {
                        flag = true;
                    }
                });
            }); 
             
            waitsFor(function() {
                return flag;
            });
            runs(function() {
                var value = $(".example3").css("opacity");
                expect(value).toEqual("1");
            });
        });
    });
});