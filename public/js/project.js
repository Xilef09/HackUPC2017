/**
 * Created by Gui on 04/03/2017.
 */

angular.module('myApp')
    .controller('project', ['$scope', '$location', 'getProjects','putProjects', '$mdDialog', function ($scope, $location, getProjects, putProjects, $mdDialog){
    $scope.getProjects = function () {
        //comprobar si los datos son correctos
        getProjects.getProjects(token).then(function (result) {
            if(result == undefined){
                var alert = dialog.alert({
                    title: 'Attention',
                    textContent: 'This is an example of how easy dialogs can be!',
                    ok: 'Close'
                });

                dialog
                    .show( alert )
                    .finally(function() {
                        alert = undefined;
                    });
                //$mdDialog.show("Bad credentials, please stop write with your trunks");
            }
            else{
                for(var i=0;i<result.size();++i){
                    $scope.listaProj.append(result[i].name);
                }
                //$scope.listaProj = result;
            }
        });
    };
        $scope.putProjects = function () {
            //comprobar si los datos son correctos
            putProjects.putProjects(token, projectName, programRef).then(function (result) {
                if(result == undefined){
                    var alert = dialog.alert({
                        title: 'Attention',
                        textContent: 'This is an example of how easy dialogs can be!',
                        ok: 'Close'
                    });

                    dialog
                        .show( alert )
                        .finally(function() {
                            alert = undefined;
                        });
                    //$mdDialog.show("Bad credentials, please stop write with your trunks");
                }
                else{
                    //$scope.getProjects();
                    //$scope.listaProj = result;
                }
            });
        };

        $scope.listaProj = ["Trello 1", "Trello 2", "Jira1"];
    var taskProj1 = ['a', 'b', 'c'];
    var taskProj2 = ['a', 'b', 'c', 'd'];
    var taskProj3 = ['a'];

    $scope.tareas = {"frontend": "3h","backend": "4h","midendKappa": "7h"};

    $scope.select = function(proyecto){
        // Coger id del board
        if (proyecto == 'Trello 1') $scope.tareas = taskProj1;
        else if (proyecto == 'Trello 2') $scope.tareas = taskProj2;
        else if (proyecto == 'Jira1') $scope.tareas = taskProj3;

        // Coger las tareas del board que estan asignadas a mi y añadirlas a tareas

        $scope.selected = proyecto;
    };
}]);