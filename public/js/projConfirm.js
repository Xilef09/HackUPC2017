/**
 * Created by Gui on 04/03/2017.
 */

angular.module('myApp')
    .controller('projConfirm', ['$scope', '$location', 'putProjects', '$mdDialog', function ($scope, $location, putProjects, $mdDialog) {
        console.log("Hi");
        console.log($mdDialog);
        $scope.customFullscreen = false;
        $scope.checkLogin = function () {
            var user = $("#lg_username").val();
            var password = ($("#lg_password").val());
            var dialog = $mdDialog;
            //comprobar si los datos son correctos
            checkLogin.checkLogin(user, password).then(function (result) {
                if(result == undefined){
                    var alert = dialog.alert({
                        title: 'Bad credentials',
                        textContent: 'Please stop write with your trunks!',
                        ok: 'Accept'
                    });

                    dialog
                        .show( alert )
                        .finally(function() {
                            alert = undefined;
                        });
                }
                else {

                    $location.path('project');
                }
            });
        };

    }]);