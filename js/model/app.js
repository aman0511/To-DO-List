var TODO = TODO || {};

// a task model
TODO.task = function (text) {
	this.text = text;
	this.createdAt = new Date();
	this.completed = false;
};
var app = angular.module("To_Do", ['storageService']);