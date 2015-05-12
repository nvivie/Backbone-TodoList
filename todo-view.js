var TodoApp = window.TodoApp || {};

TodoApp.TodoView = Backbone.View.extend({
    tagName: 'li',
    className: 'todo',
    template: _.template($('#todo-template').html()),

    events: {
        'click .delete': 'delete_todo',
        'click .complete': 'complete_todo',
        'click .incomplete':'incomplete_todo'
    },

    delete_todo: function(e) {
        e.preventDefault();

        if (this.model.get('complete') || confirm('Are you sure you want to delete this todo item?')) {
            this.model.destroy();

            this.$el.slideUp('fast', function() {
                this.remove();
            });
        }
    },

    complete_todo: function(e) {
        e.preventDefault();

        this.model.set('complete', true);
        // save it in local storage
        this.model.save();
        this.$el.addClass('completed');
    },
     incomplete_todo: function(e) {
        e.preventDefault();

        this.model.set('complete', false);
        // save it in local storage
        this.model.save();
        this.$el.removeClass('completed');
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        if (this.model.get('important')) {
            this.$el.addClass('important');
        }

        if (this.model.get('complete')){
            this.$el.addClass('completed');
        }
        return this;
    }

   
});
