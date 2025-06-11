// app.js
var app = angular.module('restaurantApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/sign-up', {
            templateUrl: 'sign-up.html',
            controller: 'SignUpController'
        })
        .when('/my-info', {
            templateUrl: 'my-info.html',
            controller: 'MyInfoController'
        })
        .otherwise({
            redirectTo: '/sign-up'
        });
});

app.controller('MainController', function($scope, $location) {
    $scope.goToSignUp = function() {
        $location.path('/sign-up');
    };
    
    $scope.goToMyInfo = function() {
        $location.path('/my-info');
    };
});


// app.js (continuation)
app.controller('SignUpController', function($scope, $http, UserService) {
    $scope.user = {};
    $scope.menuItemError = false;
    $scope.userSaved = false;
    
    $scope.checkMenuItem = function() {
        const url = `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${$scope.user.favoriteDish.charAt(0)}/menu_items/${$scope.user.favoriteDish.slice(1)}.json`;
        
        $http.get(url).then(function(response) {
            if (response.data) {
                $scope.menuItemError = false;
            } else {
                $scope.menuItemError = true;
            }
        });
    };
    
    $scope.submitForm = function() {
        if (!$scope.menuItemError) {
            UserService.saveUser($scope.user);
            $scope.userSaved = true;
        }
    };
});

// app.js (continuation)
app.controller('MyInfoController', function($scope, UserService) {
    $scope.user = UserService.getUser();
});
