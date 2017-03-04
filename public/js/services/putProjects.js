/**
 * Created by Gui on 04/03/2017.
 */




angular.module('myApp')
    .service('putProjects', ['restService' , function (restService) {
        this.putProjects = function (token, projectName, programRef) {
            var data = {
                header:{
                    'token' : token
                },
                body:{
                    'projectName' : projectName,
                    'programRef' : programRef
                }
            }
            return restService.get('/project', data);
        };
    }]);