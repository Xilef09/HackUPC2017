/**
 * Created by sinnombre on 4/03/17.
 */



angular.module('myApp')
    .service('checkLogin', ['restService' , function (restService) {
        this.checkLogin = function (username, password) {
            var body = {
                'name' : username,
                'password' : password
            };
            return restService.post('/authenticate', body);
        };
    }]);