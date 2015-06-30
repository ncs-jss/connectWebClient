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

.controller('AppCtrl', function() {
  var self = this;
  self.message = "The app routing is working!";
});