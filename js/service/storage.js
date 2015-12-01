// an angular storage service
var storageService = angular.module('storageService', [])
.service('storage', function(){
	
	var todoKey = "todo_data";

	this.getTodos = function(){
		todolist = (localStorage.getItem(todoKey)!==null) ? JSON.parse(localStorage.getItem(todoKey)) : [];
		return todolist		
	}
	this.addTodo = function(taskName){
			console.log("storage"+ taskName.text);
			todoList = this.getTodos()
			console.log(todoList);
			todoList.push(taskName);
			console.log(todoList);
			localStorage.setItem(todoKey, JSON.stringify(todoList));
	}
	this.removeTodo = function(taskName){
		var todoList = this.getTodos();
		todoList.splice($.inArray(taskName, todoList), 1);
		localStorage.setItem(todoKey, JSON.stringify(todoList));
	}

	this.completeTodo = function(taskName){
		taskName = angular.copy(taskName);
		var todoList = this.getTodos();
		for(var i=0; i<todoList.length; i++){
			if(JSON.stringify(todoList[i]) == JSON.stringify(taskName)){
				todolist[i].completed = true;
			}
		}
		localStorage.setItem(todoKey, JSON.stringify(todoList));
	}	
});