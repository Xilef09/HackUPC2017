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

        var putProjects2 = putProjects;
        var callback2 = function (id, name) {
            var callback3 = function (response) {
                console.log("The response");
                console.log(response);
                var i;
                for (i in response) {
                    putProjects2.putCardsOfProject(response[i].name , "", 0, name);
                }
            };
            trelloService.getCardOfBoards(id, callback3);
        };

        $scope.save = function (proyecto) {
            console.log(proyecto);
            putProjects.putProjects(proyecto.name, "Trello");
            callback2(proyecto.id, proyecto.name)
        }

    }]);