/**
 * Created by Gui on 04/03/2017.
 */

angular.module('myApp')
    .controller('project', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
    $scope.listaProj = ["Trello 1", "Trello 2", "Jira1"];
    var taskProj1 = ['a', 'b', 'c'];
    var taskProj2 = ['a', 'b', 'c', 'd'];
    var taskProj3 = ['a'];

        $scope.status = '';

    $scope.tareas = {"frontend": "3h","backend": "4h","midendKappa": "7h"};

    $scope.select = function(proyecto){
        // Coger id del board
        if (proyecto == 'Trello 1') $scope.tareas = taskProj1;
        else if (proyecto == 'Trello 2') $scope.tareas = taskProj2;
        else if (proyecto == 'Jira1') $scope.tareas = taskProj3;

        // Coger las tareas del board que estan asignadas a mi y añadirlas a tareas

        $scope.selected = proyecto;
    };

    $scope.addHours = function () {
        console.log("HI");
        var hours;
        $scope.customFullscreen = false;
        var dialog = $mdDialog;
        var confirm = dialog.prompt({
            title: 'Add/Modify hours to this task',
            textContent: 'Write the number of hours for this task',
            ok: 'Save',
            cancel: 'Discard'
        });

        dialog
            .show(confirm).then(function (result) {
                $scope.status =  result;
                console.log($scope.status);
            })
            .finally(function() {
                alert = undefined;
            });

    }
}]);