/**
 * Created by Gui on 04/03/2017.
 */
var listaProj = {
    "uno":"Trello 1",
    "dos":"Trello 2",
    "tres":"jira 1"
};
angular.module('myApp')
    .controller('MyCtrl', ['$scope',
function ($scope) {
    $scope.items = listaProj;
}]);