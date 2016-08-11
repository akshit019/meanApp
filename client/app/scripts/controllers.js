'use strict';

angular.module('meanApp')

.controller('LoginController', ['$scope', '$location', '$localStorage', 'AuthFactory', function ($scope, $location, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe) {
           $localStorage.storeObject('userinfo',$scope.loginData);
        }

        AuthFactory.login($scope.loginData);

    };
            
    // $scope.openRegister = function () {
    //     ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    // };
    
}])

.controller('RegisterController', ['$scope', '$localStorage', 'AuthFactory', function ($scope, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);

    };
}])

.controller('DashboardController', ['$scope', '$location', 'AuthFactory', function ($scope, $location, AuthFactory) {
    //$scope.authorization = AuthFactory.isAuthenticated;
    //console.log($scope.authorization);

    $scope.name = AuthFactory.getUsername();
    console.log($scope.name);


    $scope.doLogout = function () {
        AuthFactory.logout();
    }

}])


;