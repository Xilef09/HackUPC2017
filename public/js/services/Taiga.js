
angular.module('myApp')
    .service('taigaService', ['restService' , function (restService) {
        this.taigaLogin = function (username, password) {
            var body = {
                'name' : username,
                'password' : password
            };
            return restService.post('/authenticate', body);
        };
    }]);

angular.module('myApp')
    .controller('taigaController', ['$scope', '$location', 'taigaService', function ($scope, $location, taigaService) {

        taigaService.taigaLogin("", "");

    }]);