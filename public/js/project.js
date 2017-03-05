/**
 * Created by Gui on 04/03/2017.
 */

angular.module('myApp')
    .controller('project', ['$scope', '$location', 'getProjects','putProjects', '$mdDialog', function ($scope, $location, getProjects, putProjects, $mdDialog){

        $scope.listaProj = [];
        //comprobar si los datos son correctos
        getProjects.getProjects().then(function (result) {
            //console.log(result);
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
                for(var i=0;i<result.length;++i){
                    //console.log(result[i].projectName);
                    $scope.listaProj.push(result[i].projectName);
                }
                //$scope.listaProj = result;
            }
        });

        var getProjects2 = getProjects;
        console.log(getProjects);


    $scope.select = function(proyecto){
        console.log(getProjects2);
        var data = [];
        getProjects2.getProjectTasks(proyecto).then(function (result) {
            $scope.tareas = result;
        });

        // Coger id del board
        //if (proyecto == 'Trello 1') $scope.tareas = taskProj1;
        //else if (proyecto == 'Trello 2') $scope.tareas = taskProj2;
        //else if (proyecto == 'Jira1') $scope.tareas = taskProj3;

        // Coger las tareas del board que estan asignadas a mi y añadirlas a tareas

        $scope.selected = proyecto;
    };

    var putProjects2 = putProjects;
    $scope.addHours = function (task) {
        console.log(task);
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
                putProjects2.putCardsOfProject(task.name , "", $scope.status, $scope.selected);
            })
            .finally(function() {
                alert = undefined;
            });

    }

}]);