var app = angular.module('myApp')
    .controller('StatisticsCtrl', ['$scope', 'restService',function($scope, restService) {

        $(document).ready(function(){
            var response = restService.get("/project", {});
            console.log("AQUI");
            console.log(response);
            console.log(response['$$state']);
            response['$$state']['value'].forEach( function (elem){
                console.log(elem);
            });
            var data = [];

            /*response.forEach(function (entry){
                data.push({x : entry.projectName , y : entry.time});
            });

            $scope.data = [
                {
                    key: "Cumulative Return",
                    values: data
                }];*/

        });

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

    }]);
