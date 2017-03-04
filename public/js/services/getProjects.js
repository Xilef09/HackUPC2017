/**
 * Created by Gui on 04/03/2017.
 */




angular.module('myApp')
    .service('getProjects', ['restService' , function (restService) {
        this.getProjects = function (token) {
            var header = {
                'token' : token
            };
            return restService.get('/project', header);
        };
    }]);