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
.factory('Auth',['localStorageService','$http','$location',function(localStorageService,$http,$location){
    
    return {
        login:login,
        logout:logout
    };
    
    function login(user,callback){

        $http.post('http://192.168.3.19:8000/token/',JSON.stringify(user),function(data,response){
            if(data.error === false){
                localStorageService.set('auth_token',data.token);
                $location.path = "/dashboard";
            }else
                callback(data);
        },'json');
    

    }

    function logout(){
        storageService.remove('auth_token');
        $location.path = "/";        
    }
}])