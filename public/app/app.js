angular.module('connectApp', ['ngRoute','ngFileUpload'])

.config(function($routeProvider,$httpProvider){

    $routeProvider
    .when("/",{
        templateUrl: "app/views/notices.html",
        controller: "NoticeListController",
    })
    .when("/search/:search",{
        templateUrl: "app/views/notices.html",
        controller: "NoticeSearchController",
    })
    .when("/academics",{
        templateUrl: "app/views/notices.html",
        controller: "NoticeListController",
    })
    .when("/administration",{
        templateUrl: "app/views/notices.html",
        controller: "NoticeListController",
    })
    .when("/events",{
        templateUrl: "app/views/notices.html",
        controller: "NoticeListController",
    })
    .when("/placements",{
        templateUrl: "app/views/notices.html",
        controller: "NoticeListController",
    })
    .when("/misc",{
        templateUrl: "app/views/notices.html",
        controller: "NoticeListController",
    })
    .when("/starred",{
        templateUrl: "app/views/notices.html",
        controller: "NoticeListController",
    })
    .when("/profile",{
        templateUrl: "app/views/profile.html",
        controller: "ProfileController",
    })
    .when("/profile/:id/edit",{
        templateUrl: "app/views/profileEdit.html",
        controller: "ProfileEditController",
    })
    .when("/notice/:id",{
        templateUrl: "app/views/notice.html",
        controller: "NoticeController",
    })
    .when("/notice/:id/edit",{
        templateUrl: "app/views/noticeEdit.html",
        controller: "NoticeEditController",
    })
    .when("/notice/new",{
        templateUrl: "app/views/noticeNew.html",
        controller: "NoticeNewController",
    })
    .when("/logout",{
        template:"",
        controller: "LogoutController",
    })

    $httpProvider.interceptors.push('authInterceptor');
})

.run(function($rootScope){
    $rootScope.apiBaseUrl = 'http://192.168.0.9:8000/api' ;
})