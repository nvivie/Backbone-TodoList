var TodoApp = window.TodoApp || {};

TodoApp.TodoModel = Backbone.Model.extend({
    defaults: {
        title: 'Do something!',
        due: false,
        notes: '',
        important: false,
        complete: false
    }
});
