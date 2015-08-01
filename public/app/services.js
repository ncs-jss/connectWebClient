angular.module('connectApp')

.factory('authInterceptor',['$q','$injector','$location',function($q,$injector,$location){
    return{
        request: function(config){
            var storageService = $injector.get('localStorageService');
            if(storageService.get('auth_token')){
               var token = storageService.get('auth_token');
            }
            if(token)
                config.headers.Authorization = 'JWT ' + token ;
            return config;
        },
        responseErr: function(response){
            if(response.status === 401){
                storageService.remove('auth_token');
                $location.path("/");
            }
            $q.reject(response);
        }
    }
}])

.factory('Auth',['localStorageService','$http','$location','$rootScope',function(localStorageService,$http,$location,$rootScope){

    return {
        logout:logout
    };

    function logout(){
        localStorageService.remove('auth_token');
        localStorageService.remove('type');
        $location.path("/");
    }
}])
