/**
 * Created by Gui on 04/03/2017.
 */

angular.module('myApp')
    .controller('MyCtrl', ['$scope',
function ($scope) {
    $scope.listaProj = ["Trello 1", "Trello 2", "Jira1"];
    $scope.tareas = {"frontend": "3h","backend": "4h","midendKappa": "7h"};

    $scope.select = function(proyecto){
        $scope.tareas = ["Trello 2", "Trello 1", "Jira3"];

    };

}]);