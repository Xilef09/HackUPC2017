/**
 * Created by Gui on 04/03/2017.
 */

angular.module('myApp')
    .controller('project', ['$scope',
function ($scope) {
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