describe("Backbone.utils", function() {
  describe("Backbone.utils.windowWidth()", function() {
    it("Should return window width", function() {
      var content = Backbone.bbUtils.windowWidth();
      var currentWidth = $(window).width();
      expect(content).toEqual(currentWidth);
    });
  });
  describe("Backbone.utils.windowHeight()", function() {
    it("Should return window height", function() {
      var content = Backbone.bbUtils.windowHeight();
      var currentWidth = $(window).height();
      expect(content).toEqual(currentWidth);
    });
  });
  describe("Backbone.utils.phone()", function() {
    it("Android 4.0.3 not retina", function() {
      var ua = "Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30".toLowerCase();
      var phone = Backbone.bbUtils.phone(ua, true);
      expect(phone.os).toEqual("android");
      expect(phone.version).toEqual("4.0.3");
      expect(phone.isRetina).toEqual(false);
      expect(phone.pixelRatio).toEqual(1);
    });

    it("Android 4.1.1 not retina", function() {
      var ua = "Mozilla/5.0 (Linux; U; Android 4.1.1; en-us; Nexus S Build/JRO03E) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30".toLowerCase();
      var phone = Backbone.bbUtils.phone(ua, true);
      expect(phone.os).toEqual("android");
      expect(phone.version).toEqual("4.1.1");
    });

    it("Android 4.2 & retina", function() {
      var ua = "Mozilla/5.0 (Linux; U; Android 4.2; ro-ro; LT18i Build/4.1.B.0.431) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30".toLowerCase();
      var phone = Backbone.bbUtils.phone(ua, true);
      expect(phone.os).toEqual("android");
      expect(phone.version).toEqual("4.2");
    });

    it("iphone ios5", function() {
      var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3 ".toLowerCase();
      var phone = Backbone.bbUtils.phone(ua, true);
      expect(phone.os).toEqual("iphone");
      expect(phone.version).toEqual("5.0");
    });
    it("iphone ios6", function() {
      var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10A5376e".toLowerCase();
      var phone = Backbone.bbUtils.phone(ua, true);
      expect(phone.os).toEqual("iphone");
      expect(phone.version).toEqual("6.0");
    });
    it("iphone ios7", function() {
      var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/546.10 (KHTML, like Gecko) Version/6.0 Mobile/7E18WD Safari/8536.25".toLowerCase();
      var phone = Backbone.bbUtils.phone(ua, true);
      expect(phone.os).toEqual("iphone");
      expect(phone.version).toEqual("7.0");
    });
    it("blackberry 10 webkit", function() {
      var ua = "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.1.0.1429 Mobile Safari/537.10+".toLowerCase();
      var phone = Backbone.bbUtils.phone(ua, true);
      expect(phone.os).toEqual("blackberry");
      expect(phone.isWebkit).toEqual(true);
    });

    it("blackberry 7 webkit", function() {
      var ua = "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+".toLowerCase();
      var phone = Backbone.bbUtils.phone(ua, true);
      expect(phone.os).toEqual("blackberry");
      expect(phone.isWebkit).toEqual(true);
    });

    it("blackberry, not webkit", function() {
      var ua = "BlackBerry8830/4.2.2 Profile/MIDP-2.0 Configuration/CLOC-1.1 VendorID/105".toLowerCase();
      var phone = Backbone.bbUtils.phone(ua, true);
      expect(phone.os).toEqual("blackberry");
      expect(phone.isWebkit).toEqual(false);
    });
  });

  describe("Backbone.utils.useAnim()", function() {
    it("Android 4.1 shoud use animations", function() {
       Backbone.bbUtils.phone = function(){
        return {
          os : "android",
          version : "4.1"
        };
       };
      var useAnim  = Backbone.bbUtils.useAnim();
      expect(useAnim).toEqual(true);
    });
    it("Android 4.2 shoud use animations", function() {
      Backbone.bbUtils.phone = function(){
        return {
          os : "android",
          version : "4.2"
        };
       };
      var useAnim  = Backbone.bbUtils.useAnim();
      expect(useAnim).toEqual(true);
    });
    it("Android 4.0 shoud not use animations", function() {
      Backbone.bbUtils.phone = function(){
        return {
          os : "android",
          version : "4.0"
        };
       };
      var useAnim  = Backbone.bbUtils.useAnim();
      expect(useAnim).toEqual(false);
    });
    it("iphone shoud use animations", function() {
      Backbone.bbUtils.phone = function(){
        return {
          os : "iphone",
          version : "5.0"
        };
       };
      var useAnim  = Backbone.bbUtils.useAnim();
      expect(useAnim).toEqual(true);
    });
  });
});



