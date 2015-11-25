// a todo application namespace
var TODO = TODO || {};

// a task model
TODO.task = function (text) {
	this.text = text;
	this.createdAt = new Date();
	this.completed = false;
};

// an angular storage service
var storageService = angular.module('storageService', [])
.service('storage', function(){
	var todoList = (localStorage.getItem('todos')!==null) ? JSON.parse(localStorage.getItem('todos')) : [];

	var getTodos = function(){
		return todoList
	}
	var addTodo = function(task){
			todoList.push(task);
			localStorage.setItem('todos', JSON.stringify(todoList));
	}
	var removeTodo = function(task){
		todoList.splice($.inArray(task, todoList), 1);
		localStorage.setItem('todos', JSON.stringify(todoList));
	}
	var completeTodo = function(task){
		task.completed = true;
	}

	return {
		"getTodos": getTodos,
		"addTodo": addTodo,
		"removeTodo": removeTodo,
		"completeTodo": completeTodo
	}

});


// Define a new module for our app
var app = angular.module("To_Do", ['storageService']);
app.controller("To_Do_List", function($scope, storage){

	$scope.task = new TODO.task();

	// assign data from the localStorage
	$scope.todos = storage.getTodos();

	$scope.addTodo = function(task) {
		storage.addTodo(task);
		$scope.task = new TODO.task();
	};

	$scope.removeTodo = function(task){
		storage.removeTodo(task);
	};
	$scope.completeTodo = function(task){
		storage.completeTodo(task)
	}

});

app.directive("todoList", function(){
	return{
		restrict: 'AE',
		replace: 'true',
		templateUrl: 'todolist.html'
	};
});
