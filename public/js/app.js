'use strict';
angular.module('myApp', ['ui.router', 'ngMaterial', 'nvd3'])
    .constant('MY_CONSTANTS', {
        "SERVER_IP" : "http://45.55.176.54:8080/api",
        "LOCALHOST_IP" : 'http://localhost:8080/api'
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
        .state('signUp', {
            url : '/signUp',
            templateUrl : "SignUp.html",
            controller  : 'SignUpController'
        })
        .state('project', {
            url : '/project',
            templateUrl : 'projectsView.html',
            controller  : 'project'

        });

};