/**
 * Created by julian on 4/03/17.
 */

angular.module('myApp')
    .service('signUpService', ['restService' , function (restService) {
        this.signUpService = function (username, password, email, fullname, gender) {
            var body = {
                'name' : username,
                'password' : password,
                'email' : email,
                'fullname' : fullname,
                'gender' : gender
            };
            return restService.post('/signup', body);
        };
    }]);