/**
 * Backbone.ListView
 * 
 * Helping you handle list views that are pretty comming in mobile apps.
 */
Backbone.ListView = Backbone.View.extend({
    events:{
        // By default the vien handle search accross a collection
        "keyup .searchList": "search"
    },
    defaults : {
        // fetch option for collection
        fetch: {
            limit : 20,
        }
    },
    initialize: function() {
        var self = this;
        // extend options passed when extending the view
        this.options = $.extend(true, this.defaults, this.options);
        // since this view has no context we need to add one
        this.$el = this.options.el;
        // you might not want to render it when it's initialized, but that is generally the case
        if(!this.options.noRender) this.render();
    },
    render : function(){
        // on render it gets the collection
        this.fetch();
    },
    fetch : function(){
        var self = this;
        this.trigger("list.fetching", [this.collection]);
        // add an offset option in case the api needs it
        this.options.fetch.offset = this.collection.length;
        this.collection.fetch({
            // I pass other options when initializing the view
            data: this.options.fetch,
            success : function (content) {
                $.pageload.hide();
                // now that we have the collection we render the list form that
                self.renderList();
                self.trigger("list.fetched", [this.collection]);
                // you can also pass a success function to this component when you init it
                if(self.options.success) self.options.success();
            }
        }); 
    },
    renderList : function(items){
        var self = this;
        // let's create a fragment for looping our list, it's faster
        var $frag = document.createDocumentFragment();
        // do we got a template?
        var viewItem = (this.options.viewItem) ? this.options.viewItem : Backbone.ListItem;
        this.collection.each(function(item,i){
            if(i >= self.options.fetch.limit){
                // hide the button if we have less items to add than our limit
                self.$el.find(".btnLoadMore").addClass("hidden");
                return {};
            }
            self.$el.find(".btnLoadMore").removeClass("hidden");
            var view = new viewItem({
                template : self.options.itemView,
                model: item
            });
            $frag.appendChild(view.render().el);
            
        });
        // look for a list container in
        this.$el.find(".listContainer").html($frag);
        this.trigger("list.rendered");
    },
    search : function(){
        var letters = this.$el.find("#searchInput").val();
        this.renderList(this.collection.search(letters));
    }
});


Backbone.ListItem = Backbone.View.extend({
    events: {
        // generally an item link to another page, add this class to automatically handle that
        "click .navigate" : "navigate"
    },
    className: "itemList clearfix",
    initialize : function(){
        // render our template giden in the extenciation options
        this.template = _.template($(this.options.template).html());
    },
    render: function(data) {
        // get model data (may be passed as a param)
        var content = (data) ? data : this.model.toJSON();
        // pass data to template en render this view dom elemetn
        this.$el.html(this.template({data:content}));       
        // return dom element 
        return this;
    },
    navigate: function(e){
        e.preventDefault();
        $.publish("menu.hide");
        // yeah I need to do something about that
        appmobile.routing.navigate($(e.currentTarget).attr("href"), {trigger: true});
    },
    // just a small function that help remove the list item
    removing: function(){
        var self = this;
        this.$el.slideUp(function(){
            self.remove();
        });
    }
});