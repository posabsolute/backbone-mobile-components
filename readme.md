# Backbone Mobile components v0.9 (beta)

[![Build Status](https://travis-ci.org/posabsolute/backbone-mobile-components.png?branch=master)](https://travis-ci.org/posabsolute/backbone-mobile-components)

Include 7 components to use with backbone to help you get started with doing mobile web apps. This is not a boilerplate project, it do not assume anything about your structure or stack.


*Documentation: http://documentup.com/posabsolute/backbone-mobile-components*

## Dependencies

* TweenLite
* Hammer.js

## MobilePageView

Easily setup a paging system for your mobile app.

### init

Extend MobilePageView like you would for a normal view

    var Lists = Backbone.MobilePageView.extend({
        events:{
            "event" : "method"
        },
        className:"pageLists pageContent",
        initialize : function  () {
            this.template = _.template($("#lists_tpl").html());
        },
        render: function(data) {
            this.show({animType:"slideleft"});  
            return this;
        },
        myOtherMethods : function(){
      
        }
    });

### rendering


    var page = Lists({
        topbar : appmobile.topbar,
        menu : appmobile.menu,
        title : "page title"
    }); 
    $("#overflower").append(page.render().el);

### Options
    
When rendering you can pass multiple options that will be used by other components.

#### Title & topbar

When passing a title and topbar, the page will automatically trigegr a title change when changing the page.

#### menu

Passing a menu enable a page that when swiped, show the side menu.

### show the page

When showing a page, the current page will be automatically removed,

    this.show({animType:"slideleft"});  

You can pass an animType thar will be used to animate both the current and new page to be shown. Currently There is only 3 anim type.

* slideleft
* slideup
* opacity


### hide a page

Generally you should not hide a page yourself as this is handle automatically when using the show method.

    this.hide({animType:"slideleft"})




## MobileMenuView

Let you create a side action menu that can tie-in easily in the topbar.

### init & Rendering

    var menu = new appmobile.views.Menu();

### HTML Template

Currently the template html is static, taken directly from the #menu_tpl dom node, will be change before 1.0

### showMenu

Will show the menu and move to the side the current page

    menu.trigger("showMenu")

### hideMenu

    menu.trigger("showMenu")

### navigate

Currently each "a" element are tied in to pages, in that sense the navigate method is called when one of those is pushed




## MobileTopbarView

Creates a fixed top toolbar with buttons, sub menu & dynamic page title

### init & Rendering

    var topbar = new appmobile.views.Topbar({
        menu : appmobile.menu
    });

### HTML Template

Currently the template html is static, taken directly from the #topbar_tpl dom node, will be change before 1.0

#### attaching a menu
Like shown below, you can attach a menu to the topbar, that will add a button to the left of the title.

### Adding a button & action to the right

    topbar.trigger("loadActionBtn", {
        icon : "<span class='icon_plus_person'></span>",
        action : function () {
            self.loadAddPoopin();
        }
    });

### Adding a submenu

A submenu will be triggered when the right side button is pushed

    topbar.trigger("loadActionBtn", {
        icon : "<span class='icon_plus_person'></span>",
        subMenuItems : {
            item1 : {
                oid : "item1",
                name : "popup title 1",
                action : function(){
                    self.loadSchedulePopup();
                }
            },
            item2 : {
                oid : "item2",
                name : "popup title 2",
                action : function(){
                    self.loadSendNowPopup();
                }
            }
        }
    });


### Remove right button

    topbar.trigger("removeActionBtn")

## MobilePopin

Let you create mobile overlays easily

###  Initialisation

You can easily extend the mobile component like you would do for any view, but by extending MobilePopin

    var AddContactPopin = Backbone.MobilePopin.extend({
        events:{
            "submit #addContacts" : "add"
        },
        beforeRender : function () { },
        afterRender : function() {}
        add: function (evt) {
            // add contact stuff
        }
    });

There is 2 utility methods available for you

#### beforeRender

Called before the mobile popup is shown


#### afterRender

Called after the mobile popup is shown


### Rendering

Now that we got our template popup we can instantiate it and render it. You must pass it a content option with your rendered html template in it. 
You could also put that in the init phase upward.

    var popup = new appmobile.views.AddContactPopin({
        content : _.template($("#contacts_add_tpl").html())
    }).render();

### Hide

You can call the popup by calling the hide method.

    popup.hide();


## ListView

Helping you handle list views that are pretty comming in mobile apps.

### init & renderering

    var contacts = new Backbone.ListView({
        el : this.$el,
        collection : new appmobile.collections.Contacts(),
        itemView : "#list_contact_item",
        fetch : {
            list_id : this.options.id
        }
    });
        

### Options

#### el
Since the list view has no context we need to add one

#### itemView

Your html template for each item

#### collection

Backbone Collection to be fetched for this list.

#### fetch

Options to be passed to the fetch call




## bbanimate

Control all animations in the mobile app with TweenLite(http://www.greensock.com/gsap-js/). Helps you serve animation to device that can handle it.

### go

You should pass all your animation through this function, it will check if your phone cam handle animations and act accordingly by either 
letting the animation play or directly update the css with the style required.

Exemple:

	Backbone.bbanimate.go({
        to:$(".overayContent"),
        speed:0.25,
        ease: Power1.easeIn,
        attrs : {opacity: 0},
        onComplete: function() {
			$(".overayContent").remove();
		}
    });

There is multiple effects possible with GSAP I recommend you check the website for more information on how you can make great animations http://www.greensock.com/gsap-js/.

### page.show

Internal function use by the page component to animate the pages, see the page component for more informations

### page.hide

Internal function use by the page component to animate the pages, see the page component for more informations


## bbUtils

Utilities that you can use thoughout your app

### windowWidth

Get the phone screen width

	Backbone.bbUtils.windowWidth()

### windowHeight

Get the phone screen height

	Backbone.bbUtils.windowHeight()

### useAnim

Check is the phone can run anims, by default animation is active unless the phone has android & version 4.0.4 and lower.

	Backbone.bbUtils.useAnim()

### phone

Retrieve Important phone informations and return an object, currently supported operating system:  android, iphone, ipad, blackberry

Call:

	Backbone.bbUtils.phone()

Example:

    content = {
        os : "android",
        version : "4.1.1",
        isRetina : false,
        ua : "Mozilla/5.0 (Linux; U; Android 4.1.1; en-us; Nexus S Build/JRO03E) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
    };


## License (MIT)

Copyright 2013 Cedric Dugas
http://www.position-relative.net/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
