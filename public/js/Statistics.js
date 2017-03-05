var app = angular.module('myApp')
    .controller('StatisticsCtrl', ['$scope', 'restService', function($scope, restService) {

        $scope.listaProj = [];
        var data = [];
        //comprobar si los datos son correctos
        restService.get("/project").then(function (result) {
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
                    data.push({x : result[i].projectName, y : result[i].time});
                }
                //$scope.listaProj = result;
            }
        });

        $scope.data = [
            {
                key: "Cumulative Return",
                values: data
            }];

        $scope.optionsBar = {
            chart: {
                type: 'discreteBarChart',
                height: 400,
                width : 700,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.x;},
                y: function(d){return d.y;},
                showValues: true,
                duration: 500,
                yAxis: {
                    axisLabel: 'Hours',
                    axisLabelDistance: -10
                }
            }
        };

        $scope.select = function(proyecto){
            console.log(proyecto);
            // Coger id del board
            //if (proyecto == 'Trello 1') $scope.tareas = taskProj1;
            //else if (proyecto == 'Trello 2') $scope.tareas = taskProj2;
            //else if (proyecto == 'Jira1') $scope.tareas = taskProj3;

            // Coger las tareas del board que estan asignadas a mi y añadirlas a tareas

            $scope.selected = proyecto;
        };

    }]);
