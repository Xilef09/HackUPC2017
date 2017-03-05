/**
 * Created by Gui on 04/03/2017.
 */




angular.module('myApp')
    .service('putProjects', ['restService' , function (restService) {
        this.putProjects = function (projectName, programRef) {
            var body={
                    'projectName' : projectName,
                    'programRef' : programRef
            };
            return restService.post('/project', body);
        };
        this.putCardsOfProject = function (name, description, time, projectName) {
            var body={
                'name' : name,
                'description' : description,
                'project' : projectName,
                'time' : time
            };
            return restService.post('/issue', body);
        }
    }]);