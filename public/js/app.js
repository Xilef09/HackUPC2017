'use strict';
angular.module('myApp', ['ui.router'])
    .constant('MY_CONSTANTS', {
        "SERVER_IP" : "http://45.55.176.54:8080/api",
        "LOCALHOST_IP" : 'http://localhost:8080/api',
        "colores" : ['#62A0CA', '#AEC7E8' , '#FF7F0E', '#FFBB78', '#2CA02C', '#A5E398', '#D62728', '#FF9896', '#9467BD', '#C5B0D5']
    })
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    //['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {


    $stateProvider
        .state('login', {
            url : '/login',
            templateUrl : 'index.html',
            controller  : 'LogInController'
        })
        .state('singUp', {
            url : '/singUp',
            templateUrl : "SingUp.html",
            controller  : 'SignUpController'
        })
        .state('project', {
            url : '/project',
            templateUrl : 'projectsView.html',
            controller  : 'project'

        });

};