/**
 * Created by Gui on 04/03/2017.
 */




angular.module('myApp')
    .service('getProjects', ['restService' , function (restService) {
        this.getProjects = function () {
            return restService.get('/project');
        };
        this.getProjectTasks = function (projectName) {
            var params={
                'project' : projectName
            };
            return restService.get('/issue/' + projectName, params);
        };
    }]);