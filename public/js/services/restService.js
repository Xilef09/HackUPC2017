/**
 * Created by Home on 20/11/2016.
 */


angular.module('myApp')
    .service('restService', ['MY_CONSTANTS', '$http' , function (MY_CONSTANTS, $http) {
        this.get = function (url, params) {
            return $http.get(MY_CONSTANTS.SERVER_IP + url, params)
                .then(function successCallback(response) {
                    if (params != null) {
                        return response['data']['msg']['data'];
                    }
                    else {
                        return response['data']['msg']['data'][0];
                    }

                }, function errorCallback(response) {
                        return "Error getting data";
                });
        };
        this.post = function (url, data) {
            return $http.post(MY_CONSTANTS.SERVER_IP + url, data)
                .then(function successCallback(response) {
                    console.log(response);
                    if(response['data']['msg'] != undefined) {
                        if(response['data']['msg']['data'] != undefined) {
                            return response['data']['msg']['data'];
                        }
                        return response['data']['msg'];
                    }
                    else if (response['data']['token'] != undefined){
                        return response['data']['token'];
                    }
                    else {
                        return response['data']['result']['data'];
                    }
                }, function errorCallback(response) {
                    return "Error getting data";

                });
        }
    }]);
