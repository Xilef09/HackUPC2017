/**
 * Created by Gui on 04/03/2017.
 */

angular.module('myApp')
    .controller('projConfirm', ['$scope', 'putProjects', 'trelloService', function ($scope, putProjects, trelloService) {

        trelloService.authorize();


        var callback = function (result) {
            console.log(result);
            console.log(result[0]);
            result.forEach(function (k, v, arr) {
                document.getElementById('mydiv').innerHTML +=
                    "<div class='list-group-item list-group-item2' ng-click='select(proyecto)'>" + k.name +
                    " <input type='checkbox' style='left: 0px; float: right; position: relative' name='favorite1' value='chocolate' />" +
                    "</div>";
            });



        };

        trelloService.getBoards(callback);




        var taskProj1 = ['a', 'b', 'c'];
        var taskProj2 = ['a', 'b', 'c', 'd'];
        var taskProj3 = ['a'];

    }]);