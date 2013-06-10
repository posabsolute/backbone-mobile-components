(function( $ ){
  $.pageload = {
    options : {
      timeout : 400
    },
    show : function (settings) {
      var options = $.extend(this.options, settings);
      
      this.elapsedShow = setTimeout(function(){
        if(!$("#pageload").length) {
          var $loader = $("<div>").attr("id", "pageload");
          $("body").append($loader);
        }
        
        
        $("#pageload").stop().animate({
          marginRight:0
        },200);
      },options.timeout);
    },
    hide : function (el) {
      clearTimeout(this.elapsedShow);
      $("#pageload").animate({
        marginRight:"-50px",
        opacity : 0
      },250, function () {
        $(this).remove();
      });
    }
  };
})( jQuery );

