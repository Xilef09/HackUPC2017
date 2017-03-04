/**
 * Created by julian on 4/03/17.
 */

angular.module('myApp')
    .service('signUpService', ['restService' , function (restService) {
        this.signUpService = function (username, password) {
            var body = {
                'name' : username,
                'password' : password
            };
            console.log(username);
            console.log(password);
            return restService.post('/authenticate', body);
        };
    }]);