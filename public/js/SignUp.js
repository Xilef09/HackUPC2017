/**
 * Created by julian on 4/03/17.
 */
angular.module('myApp')
    .controller('SignUpController', ['$scope', function ($scope) {
        $scope.sendValues = function() {

            /*$("#register-form").validate({
                rules: {
                    reg_username: "required",
                    reg_password: {
                        required: true,
                        minlength: 5
                    },
                    reg_password_confirm: {
                        required: true,
                        minlength: 5,
                        equalTo: "#register-form [name=reg_password]"
                    },
                    reg_email: {
                        required: true,
                        email: true
                    },
                    reg_agree: "required",
                },
                errorClass: "form-invalid",
                errorPlacement: function( label, element ) {
                    if( element.attr( "type" ) === "checkbox" || element.attr( "type" ) === "radio" ) {
                        element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
                    }
                    else {
                        label.insertAfter( element ); // standard behaviour
                    }
                },
                submitHandler: function(form) {
                    // DataBase TODO
                    //
                    console.log($("#reg_username").val());
                }
            });*/


        };

    }]);