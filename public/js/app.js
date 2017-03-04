'use strict';
angular.module('myApp', ['ui.router', 'ngMaterial'])
    .constant('MY_CONSTANTS', {
        "SERVER_IP" : "http://45.55.176.54:8080/api",
        "LOCALHOST_IP" : 'http://localhost:8080/api'
        })
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    //['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {


    $stateProvider
        .state('mainView' , {
            url : '/mainView',
            templateUrl : "taskManagement.html",
            controller  : 'project'
        })
        .state('graphics' , {
            url : '/graphics'

        })
        .state('syncWithTrello' , {
            url : '/synchWithTrello'


        });


};