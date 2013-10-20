/**
 * Backbone.bbUtils 
 * 
 * Utilities that you can use thoughout your app
 * Information is cached after it has been hit one time in the app cycle
 */
Backbone.bbUtils = {
    // get the window width
    windowWidth : function(){
        if(!this.cacheWidth){
            this.cacheWidth = $(window).width();
            return this.cacheWidth;
        }else{
            return this.cacheWidth;
        }
    },
    // get the window height
    windowHeight : function(){
        if(!this.cacheHeight){
            this.cacheHeight = $(window).height();
            return this.cacheHeight;
        }else{
            return this.cacheHeight;
        }
    },
    // check if android is used, 
    // Android device without dual core perform very badly
    useAnim : function(){
        //return false;
        var phone = this.phone();

        if(phone && phone.os === "android") {
            // Now check if the device got 4.1+, meaning they are more performant devices
            if(/4.0/.test(phone.version)){
                 // android 4.0.x,2 & 3, nope your not strong enough
                return false;
            }else{
                return true;
            }
        }else{
            // Iphone, desktop, blackberry, etc
            return true;
        }
    },
    // Utility that retrieve important phone informations
    phone : function(myua, noCache){
        // check if info is cached
        if(this.cachePhone && !noCache){
            return this.cachePhone;
        }
        // depending on the phone type return an object 
        var content, uaindex,
            ua = (myua) ? myua : navigator.userAgent.toLowerCase(),
            isRetina = (window.devicePixelRatio && window.devicePixelRatio>=2) ? true : false,
            pixelRatio = window.devicePixelRatio;

        if( ua.indexOf("android") > -1  ){
            content = {
                os : "android",
                version : ua.match(/android (\d+(?:\.\d+)+);/)[1],
                isRetina : isRetina,
                pixelRatio : pixelRatio,
                ua : ua
            };
        }else if ( ua.indexOf("iphone") > -1 ){
            uaindex = ua.indexOf( 'os ' );
            content = {
                os : "iphone",
                version : ua.substr( uaindex + 3, 3 ).replace( '_', '.' ),
                isRetina : isRetina,
                pixelRatio : pixelRatio,
                ua : ua
            };
        }else if( ua.indexOf("ipad") > -1 ){
            uaindex = ua.indexOf( 'os ' );
            content = {
                os : "ipad",
                version : ua.substr( uaindex + 3, 3 ).replace( '_', '.' ),
                isRetina : isRetina,
                pixelRatio : pixelRatio,
                ua : ua
            };
        }else if( ua.indexOf("blackberry") > -1 || ua.indexOf("bb10") > -1){
            content = {
                os : "blackberry",
                isWebkit : /webkit/.test(ua),
                isRetina : isRetina,
                pixelRatio : pixelRatio,
                ua : ua
            };
        }else{
            content = {};
        }
        // save info for later so we don't hit this twice in the app live
        this.cachePhone = content;
        return content;
    }
};

// Compatibility override - Backbone 1.1 got rid of the 'options' binding
// automatically to views in the constructor - we need to keep that.
Backbone.View = (function(View) {
   return View.extend({
        constructor: function(options) {
            this.options = options;
            // automaticcally extend events & init from sub views.
            if(this.constructor.__super__.events) this.events = _.extend({},this.constructor.__super__.events,this.events);
            if(this.constructor.__super__.initialize) this.constructor.__super__.initialize.apply(this, arguments);
            View.apply(this, arguments);
        }
    });
})(Backbone.View);