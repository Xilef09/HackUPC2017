/**
 * Created by Gui on 04/03/2017.
 */

angular.module('myApp')
    .controller('projConfirm', ['$scope', 'putProjects', 'trelloService', function ($scope, putProjects, trelloService) {

        trelloService.authorize();

        trelloService.getBoards();


        $scope.listaProj = trelloService.boards;


        var taskProj1 = ['a', 'b', 'c'];
        var taskProj2 = ['a', 'b', 'c', 'd'];
        var taskProj3 = ['a'];

    }]);