describe("Backbone.bbanimate", function() {
	describe("Backbone.bbanimate.go()", function() {
	    it("Go should call complete when passed into param", function() {
		    $("body").append("<div class='example'></div>");
		    runs(function() {
			    flag = false;
			    Backbone.bbanimate.go({
		            to:$(".example"),
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
	    it("Element not exist, call complete", function() {
		    runs(function() {
			    flag = false;
			    Backbone.bbanimate.go({
		            to:$(".example3"),
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
	});
});