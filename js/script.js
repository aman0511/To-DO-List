//storage service

var storageService = angular.module('storageService', [])
.service('storage', function(){
	this.data = (localStorage.getItem('todos')!==null) ? JSON.parse(localStorage.getItem('todos')) : [];
	this.get_data = function(){
		return this.data
	}
	this.add_data = function(todo_text){
			var new_data = {
				text: todo_text,
				complete: false
			}
			this.data.push(new_data);
			localStorage.setItem('todos', JSON.stringify(this.data));
	}
	this.remove_data = function(todo_data){
		this.data.splice($.inArray(todo_data, this.data), 1);
		localStorage.setItem('todos', JSON.stringify(this.data));
	}
	this.complete_todo = function(todo_data){
		todo_data.complete = true;
	}
})


// Define a new module for our app
var app = angular.module("To_Do", ['storageService']);
app.controller("To_Do_List", function($scope, storage){

	// assign data from the localStorage
	$scope.todos = storage.get_data();

	$scope.addTodo = function(todoText) {
		storage.add_data(todoText);
		$scope.todoText = ''
	};

	$scope.removeTodo = function(Todo){
		storage.remove_data(Todo);

	};
	$scope.completeTodo = function(Todo_item){
		storage.complete_todo(Todo_item)
   		
	}


})


app.directive("todoList", function(){
	return{
		restrict: 'AE',
		replace: 'true',
		templateUrl: 'todolist.html'
	};
});

