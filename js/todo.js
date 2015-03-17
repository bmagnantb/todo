;
(function(exports) {

		var Backbone = require('backbone')

    Backbone.TodoRouter = Backbone.Router.extend({
        initialize: function() {
            this.collection = new Backbone.TodoList([{
                title: 'Shower'
            }, {
                title: 'Groceries'
            }]);
            // this.view = new Backbone.TodoView({
            //     collection: this.collection
            // });
        },

        routes: {
            'item/:id': 'itemDetails',
            'item/:id/edit': 'edit',
            '*default': 'home'
        },

        home: function() {
        		// this.view.$el.removeClass('fade');
        		// this.collection.models.forEach(function(val){
        		// 	val.view.$el.removeClass('show');
        		// })
          //   this.view.render();
        },

        itemDetails: function(id) {
        		// this.view.$el.addClass('fade');
            var item = this.collection.filter(function(val) {
                return id === val.get('title');
            })[0];
            // item.view.$el.addClass('show');
            item.set('editable', false)
            // item.view.render();
            return item
        },

        edit: function(id) {
        	// this.view.$el.addClass('fade');
        	var item = this.collection.filter(function(val) {
        		return id === val.get('title');
        	})[0];
        	// item.view.$el.addClass('show');
        	item.set('editable', true);
        	// item.view.render();
        	return item
        }
    });

    Backbone.ItemView = Backbone.TemplateView.extend({
        view: 'item'
        // el: '.itemcontainer'
    });

    Backbone.EditView = Backbone.TemplateView.extend({
    	view: 'edit',
    	// el: '.itemcontainer',
    	events: {
    	},
    	edit: function(e) {

    	}
    })

    Backbone.TodoItem = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false,
            urgent: false,
            dueDate: null,
            tags: [],
            id: Date.now()
        },
        initialize: function() {
            // this.view = new Backbone.ItemView({
            //     model: this
            // });
            // this.editView = new Backbone.EditView({
            // 	model: this
            // });
        }
    });

    Backbone.TodoList = Backbone.Collection.extend({
        model: Backbone.TodoItem,

        comparator: function(m1, m2) {
            var value = 0;
            (m1.get('dueDate') <= m2.get('dueDate')) ? value = -1 : value = 1;
            (m1.get('completed') !== m2.get('completed') && m1.get('completed') === true) ? value = 1 : null;
            return value;
        }
    });

    Backbone.TodoView = Backbone.TemplateView.extend({
        el: '.listcontainer',
        view: 'app',
        events: {
            'submit .add': 'addItem',
            'change .list input[type="checkbox"]': 'complete',
        },

        addItem: function(e) {
            e.preventDefault();
            var item = this.el.querySelector('input[type="text"]').value;
            this.collection.add({
                title: item
            });
        },

        complete: function(e) {
        		var item = this.filter(e.target.id)
            // var item = this.collection.filter(function(val) {
            //     return e.target.id === (val.get('title'));
            // })[0];
            // item.set('completed', !item.get('completed'), {
                silent: true
            });
            this.collection.sort();
        },

        filter: function(itemID) {
        		var item = this.collection.filter(function(val) {
        				return itemID === val.get('title')
        		})[0];

        		return item
        }
    });

})(typeof module === 'object' ? module.exports : window);
