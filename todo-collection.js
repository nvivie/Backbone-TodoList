// put namspace
var TodoApp = window.TodoApp || {};

TodoApp.TodoCollection = Backbone.Collection.extend({
	// tell collection what model to use
	// after the comma --> specifuy local storage
	model: TodoApp.TodoModel,

	// specify localStorage instead of a url
	localStorage: new Backbone.LocalStorage('todo-app'),

	// fucntion to return only completed todos
	complete:function(){
		return this.filter(function(todos){
			// if the todo is complet, add it to 
			// the return array
			return todos.get('complete');
		});
	},
	important : function(){
		return this.filter(function(todos){
				return todos.get('important');
		});
	}

});

// create an instance of our Collection
TodoApp.Todos = new TodoApp.TodoCollection();