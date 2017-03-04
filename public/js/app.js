'use strict';
angular.module('myApp', ['ui.router'])
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
            templateUrl : "SingUp.html"
        });

};