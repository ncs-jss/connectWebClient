angular.module('connectApp')

.controller('LogoutController',['$scope','Auth',function($scope,Auth){
    Auth.logout();
    console.log('logout');
}])

.controller('NoticeListController',['$scope','Notice','$location',function($scope,Notice,$location){

    var category = {
        academics : 'Academics',
        administration : 'Administration',
        placements : 'Training and Placement',
        misc : 'Miscelleneous',
        events : 'Events'
    }

    $scope.params = {};
    $scope.params.category = category[$location.path().split('/')[1]];

    $scope.paginate = function (direction){
        if(direction > 0){
            $scope.params.page = $scope.pagination.nextPage;
            search();
        }
        else{
            $scope.params.page = $scope.pagination.prevPage;
            search();
        }
    }

    function search(){

        Notice.fetchAll($scope.params,function(err,data){
            $scope.showNothing = false;
            $scope.count = +data.count;
            $scope.pagination = {
                prev:false,
                next:false
            };

            if(data.results.length > 0){
                if(data.previous){
                    $scope.pagination.prev = true;
                    if(data.previous.match(/page=\d/))
                        $scope.pagination.prevPage = +data.previous.match(/page=\d/).join().split('=')[1];
                    else
                        $scope.pagination.prevPage = 1;

                }else
                    $scope.pagination.prevPage = 1;

                if(data.next){
                    $scope.pagination.next = true;
                    $scope.pagination.nextPage = +data.next.match(/page=\d/).join().split('=')[1];
                }

                if($scope.pagination.prevPage === 1 && !$scope.pagination.prev)
                    $scope.pagination.start = 1;
                else
                    $scope.pagination.start = $scope.pagination.prevPage * 15 +1;

                $scope.pagination.end = $scope.pagination.start + data.results.length -1 ;

                $scope.notices = data.results;

            }else
                $scope.showNothing = true;

        })
    }

    search();
}])

.controller('NoticeSearchController',['$scope','Notice','$routeParams',function($scope,Notice,$routeParams){

    $scope.params =  $routeParams;

    $scope.showNothing = false;


    $scope.paginate = function (direction){
        if(direction > 0){
            $scope.params.page = $scope.pagination.nextPage;
            search();
        }
        else{
            $scope.params.page = $scope.pagination.prevPage;
            search();
        }
    }

    function search(){

        Notice.fetchAll($scope.params,function(err,data){
            $scope.showNothing = false;
            $scope.count = +data.count;
            $scope.pagination = {
                prev:false,
                next:false
            };

            if(data.results.length > 0){
                if(data.previous){
                    $scope.pagination.prev = true;
                    if(data.previous.match(/page=\d/))
                        $scope.pagination.prevPage = +data.previous.match(/page=\d/).join().split('=')[1];
                    else
                        $scope.pagination.prevPage = 1;

                }else
                    $scope.pagination.prevPage = 1;

                if(data.next){
                    $scope.pagination.next = true;
                    $scope.pagination.nextPage = +data.next.match(/page=\d/).join().split('=')[1];
                }

                if($scope.pagination.prevPage === 1 && !$scope.pagination.prev)
                    $scope.pagination.start = 1;
                else
                    $scope.pagination.start = $scope.pagination.prevPage * 15 +1;

                $scope.pagination.end = $scope.pagination.start + data.results.length -1;

                $scope.notices = data.results;

            }else
                $scope.showNothing = true;

        })
    }

    search();
}])
