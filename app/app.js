angular.module('connectApp', ['ngRoute','LocalStorageModule'])

.config(function($routeProvider,localStorageServiceProvider,$httpProvider){

    localStorageServiceProvider
    .setPrefix('connectApp')
    .setStorageType('sessionStorage');

    $routeProvider
    .when("/",{
        templateUrl: "app/views/app.html",
        controller: "AuthController",
    });

    $httpProvider.interceptors.push('authInterceptor');

})

.run(function($rootScope){
    $rootScope.apiBaseUrl = 'http://54.173.150.90:8000' ;
})