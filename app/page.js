
var Page = Backbone.MobilePageView.extend({
	events:{
		"show" : "show"
	},
	className:"pageLists pageContent",
	initialize : function  () {
		this.template = _.template($("#page_template").html());
	},
	render: function(data) {
		var self = this;
		var locals ={};
		this.$el.html(this.template({data:locals}));
		$("#overflower").append(this.$el);
		this.show();

		mytopbar.trigger("loadActionBtn", {
            icon : "<span class='icon_plus_'>a</span>",
            action : function () {
                self.addPopin();
            }
        });
		return this;
	},
	addPopin : function () {
		var popup = new Popin({
            content : _.template($("#popin_tpl").html())
        }).render();
	}
});