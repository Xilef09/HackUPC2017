/**
 * Created by julian on 4/03/17.
 */

angular.module('myApp')
    .service('signupService', ['restService' , function (restService) {
        this.signupService = function (username, password) {
            var body = {body: {
                'name' : username,
                'password' : password
            } };
            console.log(username);
            console.log(password);
            return restService.post('/authenticate', body);
        };
    }]);