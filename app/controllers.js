angular.module('connectApp')

.controller('AuthController',['$scope','Auth',function($scope,Auth){
    $scope.user = {
        'username':'',
        'password':''
    };

    $scope.login = function(){
        Auth.login($scope.user,function(data){
            if(data.error){
                $scope.errorMsg = data.message;
            }
        })
    }

}]);