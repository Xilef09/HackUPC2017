/**
 * Created by Gui on 04/03/2017.
 */

angular.module('myApp')
    .controller('project', ['$scope', function ($scope) {

        $scope.listaProj = ["Trello 1", "Trello 2", "Jira1"];
        $scope.tareas = ["frontend","backend","midendKappa"];
}]);