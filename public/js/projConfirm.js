/**
 * Created by Gui on 04/03/2017.
 */

angular.module('myApp')
    .controller('projConfirm', ['$scope', 'putProjects', 'trelloService', function ($scope, putProjects, trelloService) {

        trelloService.authorize();

        var callback = function (result) {
            $scope.listaProj = result;
            $scope.$apply();
        };

        trelloService.getBoards(callback);

        $scope.save = function (proyecto) {
            console.log(proyecto);
            putProjects.putProjects()

        }

    }]);