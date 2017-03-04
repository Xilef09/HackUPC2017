
angular.module('myApp')
    .service('taigaService', ['$http' , function ($http) {

        this.get = function (url, params) {
            return $http.get(url, params)
                .then(function successCallback(response) {
                    console.log("SuccessCallback.get: " + response);
                    if (params != null) {
                        return response['data']['msg']['data'];
                    }
                    else {
                        return response['data']['msg']['data'][0];
                    }

                }, function errorCallback(response) {
                    console.log("Error errorCallback.get: " + response);
                    return "Error getting data";
                });
        };
        this.post = function (url, data) {
            console.log(data);
            return $http.post(url, data)
                .then(function successCallback(response) {
                    console.log("SuccessCallback.post: " + response);
                    if(response['data']['msg'] != undefined) {
                        return response['data']['msg']['data'];
                    }
                    else if (response['data']['token'] != undefined){
                        return response['data']['token'];
                    }
                    else {
                        return response['data']['result']['data'];
                    }

                }, function errorCallback(response) {
                    console.log("Error response.post: " + response);
                    return "Error getting data";
                });
        }
    }]);

angular.module('myApp')
    .controller('taigaController', ['$scope', '$location', 'taigaService', function ($scope, $location, taigaService) {


        $(document).ready(function(){

            $("#connectLinkTaiga")
                .click(function(){
                    taigaService.post().then(function(){

                    });
                });
            $("#getMyBoards").click(function(){
                getBoards();
            });
            $("#getMyCards").click(function(){
                getCardsOfBoard();
            });
            $("#disconnect").click(logout);
        });

    }]);