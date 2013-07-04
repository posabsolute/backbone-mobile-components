/**
 * Backbone.ListView
 * 
 * Helping you handle list views that are pretty comming in mobile apps.
 */
Backbone.ListView = Backbone.View.extend({
    events:{
        // By default the vien handle search accross a collection
        "keyup .searchList": "search",
        "focus .searchList": "moveToSearch"
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
        this.options = $.extend({},this.defaults, this.options);
        // since this view has no context we need to add one
        this.$el = this.options.el;
        // you might not want to render it when it's initialized, but that is generally the case
        if(!this.options.noRender) this.render();
        // enabled search?
        if(this.options.search) this.loadSearch();
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

        if(!this.options.no_fetch){
            this.collection.fetch({
                // I pass other options when initializing the view
                data: this.options.fetch,
                success : function (content) {
                    fetch_done();
                }
            }); 
        }else{
            fetch_done();
        }
        function fetch_done(content){
            $.pageload.hide();
            // now that we have the collection we render the list form that
            self.renderList();
            self.trigger("list.fetched", [this.collection]);
            // you can also pass a success function to this component when you init it     
            if(self.options.fetch_success) self.options.fetch_success();
        }

    },
    renderList : function(items){
        var self = this;
        // let's create a fragment for looping our list, it's faster
        var $frag = document.createDocumentFragment();
        // do we got a template?
        var ViewItem = (this.options.viewItem) ? this.options.viewItem : Backbone.ListItem;
        // do we have a collection passed in param?
        var list = (items) ? items : this.collection;
        // load list item view
        list.each(function(item,i){
            if(i >= self.options.fetch.limit){
                // hide the button if we have less items to add than our limit
                self.$el.find(".btnLoadMore").addClass("hidden");
                return {};
            }
            self.$el.find(".btnLoadMore").removeClass("hidden");
            var view = new ViewItem({
                template : self.options.itemView,
                model: item
            });
            $frag.appendChild(view.render().el);
            
        });
        // look for a list container in
        this.$el.find(".listContainer").html($frag);
        this.trigger("list.rendered");
    },
    loadSearch : function () {
        var self = this;
        this.$el.find(this.options.search.field).on("keyup", function(){
            self.search();
        });
    },
    moveToSearch : function () {
        $("#overflower").scrollTop(this.$el.find(".searchList").offset().top-45);
    },
    search : function(){
        var letters = this.$el.find(".searchList").val();
        this.renderList(this.collection.search(letters));
    }
});


Backbone.ListItem = Backbone.View.extend({
    events: {

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
    // just a small function that help remove the list item
    removing: function(){
        var self = this;
        this.$el.slideUp(function(){
            self.remove();
        });
    }
});