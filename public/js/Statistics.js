var app = angular.module('myApp')
    .controller('StatisticsCtrl', ['$scope', 'getProjects', function($scope, getProjects) {

        $scope.listaProj = [];
        var data = [];
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
                    var pname = result[i].projectName;
                    $scope.listaProj.push(pname);
                    data.push({x : pname, y : i+1});
                }                
            }
        });

        $scope.data = data;


        $scope.optionsBar = {
            chart: {
                type: 'pieChart',
                width: 750,
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
                showLabels: false
            }
        };

        $scope.select = function(proyecto){
            console.log(proyecto);
            getProjects.getProjectTasks(proyecto).then(function (result) {
                var data = [];
                result.forEach( function (elem) {
                    if (elem.name.length > 40)
                        data.push({x : elem.name.substring(0,40) + "...", y: elem.time});
                    else
                        data.push({x : elem.name, y: elem.time});
                });
                $scope.data = data;
            });
        };

    }]);
