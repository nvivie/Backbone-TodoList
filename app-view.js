// put namspace
var TodoApp = window.TodoApp || {};

// create a new application view
TodoApp.AppView = Backbone.View.extend({
	// define the scope of the element
	// operate inside of the element specified below
	el: $('#todo-app'),

	// set up the event handler 
	events: {
		'click #create-todo': 'create_todo'
	},

	initialize: function(){
		// reference the todo list
		this.$todo_list = $('#todo-list');

		// get a reference to a form element
		this.$form = $('#todo-form');
		this.$title = $('#title');
		this.$due = $('#due');
		this.$notes = $('#notes');
		this.$important = $('#important');

		// get reference to our stats element
		this.$count_total = $('#count-total');
		this.$count_complete = $('#count-complete');
		this.$count_important = $('#count-important');

		// make this application view listen for todos
		// added to our collection
		this.listenTo(TodoApp.Todos, 'add', this.add_todo);
		// listen to any change on the collection
		// and run the 'render stats' function
		this.listenTo(TodoApp.Todos, 'all', this.render_stats);


		// get all existing todos save in localStorage
		//THIS 'FETCH' call will work with localStorage
		// as well as URL's / API
		TodoApp.Todos.fetch();
	},

	// update the important, complete and total counts
	// at the top of the todoList
	render_stats:function(){
		// get the total number of todos
		var total = TodoApp.Todos.length;

		// get the total number of completed todd
		var completed = TodoApp.Todos.complete().length;

		var important = TodoApp.Todos.important().length;

		this.$count_total.text(total);
		this.$count_complete.text(completed);
		this.$count_important.text(important);
	},

	add_todo:function(todo){
		// create an instance of the view
		var view = new TodoApp.TodoView({model: todo});

		this.$todo_list.append(view.render().el);
	},

	// handle ckiecks on the #create-todo
	create_todo: function(e){
		e.preventDefault();

		var todo_values ={
			title: this.$title.val(),
			notes: this.$notes.val(),
			due: this.$due.val(),
			important: this.$important.is(':checked')
		};
		
		// add a new todo to our collection
		TodoApp.Todos.create(todo_values);

		console.log(TodoApp.Todos);
		//reset the form
		this.$form[0].reset();

	}
});

// create an instance of our applicaiton view
///this instace acts as the ignition switch
// of our application
window.TodoAppView = new TodoApp.AppView();// without this line nothing happens