angular.module('connectApp')

.factory('authInterceptor',['$q','$injector','$location',function($q,$injector,$location){
    return{
        request: function(config){
            var storageService = $injector.get('localStorageService');
            if(storageService.get('auth_token')){
               var token = storageService.get('auth_token');
            }
            if(token)
                config.headers.Authorization = ': JWT ' + token ;
            return config;
        },
        responseErr: function(response){
            if(response.status === 401 || response.status === 403){
                storageService.remove('auth_token');
                $location.path = "/login";
            }
            $q.reject(response);
        }
    }
}])
.factory('Auth',['localStorageService','$http','$location','$rootScope',function(localStorageService,$http,$location,$rootScope){
    
    return {
        login:login,
        logout:logout
    };
    
    function login(user,callback){

        $http.post($rootScope.apiBaseUrl+'/token/',JSON.stringify(user),function(data,response){
            if(data.error === false){
                localStorageService.set('auth_token',data.token);
                $location.path = "/dashboard";
            }else
                callback(data);
        },'json');
    

    }

    function logout(){
        localStorageService.remove('auth_token');
        $location.path = "/";        
    }
}])