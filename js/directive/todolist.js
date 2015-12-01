// Define a new module for our app
app.directive("todoList", function(){
	return{
		restrict: 'E',
		replace: 'true',
		templateUrl: 'partial_template/todolist.html',
		controller: function($scope, $element, storage){
			$scope.todos = storage.getTodos();
			console.log($scope.todos);
			$scope.addTodo = function(taskName) {
				task = new TODO.task(taskName);
				console.log(task);
				storage.addTodo(task);
				// create new object
				$scope.taskName = "";
				$scope.todos = storage.getTodos();
			};

			$scope.removeTodo = function(taskName){
				// remove the task from the todolist
				storage.removeTodo(taskName);
				$scope.todos = storage.getTodos();
			};
			$scope.completeTodo = function(taskName){
				// change the status of the task
				storage.completeTodo(taskName);
				$scope.todos = storage.getTodos();
			};
		}
	};

});

app.directive("todoItem", function(){
	return{
		restrict: 'E',
		require: '^todoList',
		scope: {
      		'todo': '=',
      		'remove': '&',
      		'complete': '&'
    		},
		templateUrl: 'partial_template/todoitem.html'
	};

});