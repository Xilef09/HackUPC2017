/**
 * Created by Gui on 04/03/2017.
 */




angular.module('myApp')
    .service('putProjects', ['restService' , function (restService) {
        this.putProjects = function (token, projectName, programRef) {
            var body={
                    'projectName' : projectName
            }
            return restService.get('/project', body);
        };
    }]);