;
(function(exports) {

    Backbone.TodoRouter = Backbone.Router.extend({
        initialize: function() {
            this.collection = new Backbone.TodoList([{
                title: 'Shower'
            }, {
                title: 'Groceries'
            }]);
            this.view = new Backbone.TodoView({
                collection: this.collection
            });
            Backbone.history.start();
        },

        routes: {
            'item/:id': 'itemDetails',
            '*default': 'home'
        },

        home: function() {
        		this.view.$el.removeClass('fade');
        		this.collection.models.forEach(function(val){
        			val.view.$el.removeClass('show');
        		})
            this.view.render();
        },

        itemDetails: function(id) {
        		this.view.$el.addClass('fade');
            var detailView = this.collection.filter(function(val) {
                return id === val.get('title');
            })[0];
            detailView.view.$el.addClass('show');
            detailView.view.render();
        }
    });

    Backbone.ItemView = Backbone.TemplateView.extend({
        view: 'item',
        el: '.itemcontainer',
        renderDetails: function(e) {
            console.log(e);
        },
        events: {
        	"click .close": "close"
        },
        close: function() {
        	router.navigate('', {trigger: true, replace: false});
        }
    });

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
            this.view = new Backbone.ItemView({
                model: this
            });
        }
    });

    Backbone.TodoList = Backbone.Collection.extend({
        model: Backbone.TodoItem,
        comparator: function(m1, m2) {
            var value = 0;
            (m1.get('dueDate') <= m2.get('dueDate')) ? value = -1: value = 1;
            (m1.get('completed') !== m2.get('completed') && m1.get('completed') === true) ? value = 1: null;
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
            var item = this.collection.filter(function(val) {
                return e.target.id === (val.get('title'));
            });
            item[0].set('completed', !item[0].get('completed'), {
                silent: true
            });
            this.collection.sort();
        }
    });

})(typeof module === 'object' ? module.exports : window);
