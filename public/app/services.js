angular.module('connectApp')

.factory('authInterceptor',['$q','$window',function($q,$window){
    return{
        request: function(config){
            if(localStorage.getItem('auth_token')){
               var token = localStorage.getItem('auth_token');
            }
            if(token)
                config.headers.Authorization = 'JWT ' + token ;
            return config;
        },
        responseError: function(response){
            if(response.status === 401){
                localStorage.clear();
                $window.location.href = '/';
            }
            $q.reject(response);
        }
    }
}])

.factory('Auth',['$http','$window','$rootScope',function($http,$window,$rootScope){

    return {
        logout:logout
    };

    function logout(){
        localStorage.clear();
        $window.location.href = '/';
    }
}])

.factory('Notice',['$http','$rootScope','Upload',function($http,$rootScope,Upload){

    return {
        fetch : fetch,
        fetchAll : fetchAll,
        remove : removeNotice,
        save : save,
        update : update,
        toggleStar : toggleStarred
    };
    function fetchAll(params,callback){
        $http.get($rootScope.apiBaseUrl+'/notice/',{
            params: params
        })
        .success(function(data,status){
            callback({error:false},data);
        })
        .error(function(data,status){
            callback({error:true},{msg:'Unable to connect please retry'});
        })
    }

    function removeNotice(id,callback){
        $http.delete($rootScope.apiBaseUrl+'/notice/'+id+'/')
        .success(function(data,status){
            callback({error:false},data);
        })
        .error(function(data,status){
            callback({error:true},{msg:'Unable to connect please retry'});
        })
    }

    function fetch(id,callback){
        $http.get($rootScope.apiBaseUrl+'/notice/'+id+'/')
        .success(function(data,status){
            callback({error:false},data);
        })
        .error(function(data,status){
            callback({error:true},{msg:'Unable to connect please retry'});
        })
    }

    function save(params,file,callback){
            Upload.upload({
                url: $rootScope.baseUrl+'/notice/',
                fields: params,
                file: file,
                fileFormDataName:'file_attached'
            })
            .success(function(data,status){
                callback({error:false},data);
            })
            .error(function(data,status){
                callback({error:true},{msg:'Unable to connect please retry'});
            })
    }

    function update(params,file,id,callback){
        if(file !== undefined){
            Upload.upload({
                url: $rootScope.apiBaseUrl+'/notice/'+id+'/',
                fields: params,
                file: file,
                fileFormDataName:'file_attached'
            })
            .success(function(data,status){
                callback({error:false},data);
            })
            .error(function(data,status){
                callback({error:true},{msg:'Unable to connect please retry'});
            })
        }else{
            $http.post($rootScope.apiBaseUrl+'/samples/'+id+'/',params)
            .success(function(data,status){
                callback({error:false},data);
            })
            .error(function(data,status){
                callback({error:true},{msg:'Unable to connect please retry'});
            })
        }
    }

    function toggleStarred(id,flag,starredId,callback){
        if(!flag)
            $http.post($rootScope.apiBaseUrl+'/starred/',{notice_id:id})
            .success(function(data,status){
                callback({error:false},data);
            })
            .error(function(data,status){
                callback({error:true},{msg:'Unable to connect please retry'});
            })
        else
            $http.delete($rootScope.apiBaseUrl+'/starred/'+starredId+'/',{notice_id:id})
            .success(function(data,status){
                callback({error:false},data);
            })
            .error(function(data,status){
                callback({error:true},{msg:'Unable to connect please retry'});
            })
    }

    function fetchAllStarred(params,callback){
        $http.get($rootScope.apiBaseUrl+'/starred/',{
            params: params
        })
        .success(function(data,status){
            callback({error:false},data);
        })
        .error(function(data,status){
            callback({error:true},{msg:'Unable to connect please retry'});
        })
    }
}])