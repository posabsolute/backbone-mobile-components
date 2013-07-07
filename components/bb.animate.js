/**
 * Backbone.bbanimate
 * 
 * Control all animations in the mobile app
 * It helps you serve animation to device that can handle it
 * Use GSAP for animations
 */
Backbone.bbanimate = {
    defaults : {
        speed: 0.4,
        delay : 0,
        ease : Power1.easeOut
    },
    // This is the default anim func
    // every bb components go throught here
    go :function(params){
        // extend options with params passed from app
        var op = $.extend({}, this.defaults, params);
        // some android phones are too slow to use animations
        if(Backbone.bbUtils.useAnim() && !op.noAnim){
            // check is there is something to animate
            if(op.attrs){
                // animate using css3
                TweenLite.to(op.to, op.speed, {
                    css: op.attrs,
                    delay : op.delay,
                    ease: op.ease,
                    onComplete: function(){
                        // call callback if defined
                        if(op.onComplete) op.onComplete();
                    }
                });               
            }else{
                // call callback if defined
                setTimeout(function(){
                    if(op.onComplete) op.onComplete();
                }, (op.delay*1000));
            }
        // no animation
        }else{
            // check if tehre is a delay
            if(op.delay){
                setTimeout(function(){
                    if(op.attrs) op.to.css(op.attrs);
                    if(op.onComplete) op.onComplete();
                }, (op.delay*1000));
            }else{
                if(op.attrs) op.to.css(op.attrs);
                if(op.onComplete) op.onComplete();
            }
        }
    },
    // used by the page component to animate pages
    page : {
        show : function(params) {
            var delay,css;
            // we need to check the anim type
            // We then anim the right css props
            if(params.animType === "slideleft"){
                $(params.to).css("left", Backbone.bbUtils.windowWidth());
                css = {left: 0};
                delay = 0;

            }else if(params.animType === "slideup"){
                $(params.to).css("top", Backbone.bbUtils.windowHeight());
                css = {top: 0};
                delay = 0;    

            }else if(params.animType === "opacity" || !params.animType){
                $(params.to).css("opacity", 0);
                css = {opacity: 1};
                // delay is necessary sometimes 
                // so we don't have pages overlaying
                delay = 0.7;
            }
            // call go that animate all props in the app
            Backbone.bbanimate.go({
                to:params.to,
                delay: delay,
                attrs : css,
                ease: Power1.easeOut,           
                onComplete: params.onComplete
            });
        },
        hide : function(params){
            var delay,css;
            if(params.animType === "slideleft"){
                // place it so it's before the content
                css = {left: -Backbone.bbUtils.windowWidth()};

            }else if(params.animType === "slideup"){
                // Do nothing, heh
                delay = 0.4;

            }else if(params.animType === "opacity" || !params.animType){
                css = {opacity: 0};
            }
            Backbone.bbanimate.go({
                to:params.to,
                attrs : css,
                delay: delay,
                ease: Power1.easeOut,           
                onComplete: params.onComplete
            });
        }
    }
};