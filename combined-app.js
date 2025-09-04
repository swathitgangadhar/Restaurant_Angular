(function() {
'use strict';


angular
.module('CombinedApp', [
'ngRoute',
'LunchCheck',
'ShoppingListCheckOff',
'NarrowItDownApp',
'restaurantApp'
])
.config(Config)
.controller('ShellController', ShellController);


Config.$inject = ['$routeProvider', '$locationProvider'];
function Config($routeProvider, $locationProvider) {
$routeProvider
.when('/lunch-check', {
templateUrl: 'tpl/lunch-check.html',
controller: 'LunchCheckController'
})
.when('/shopping-list', {
templateUrl: 'tpl/shopping-list.html',
controller: 'ToBuyController',
controllerAs: 'toBuyCtrl'
})
.when('/narrow-it-down', {
templateUrl: 'tpl/narrow.html',
controller: 'NarrowItDownController',
controllerAs: 'ctrl'
})
.when('/categories', {
templateUrl: 'tpl/categories.html',
controller: 'MainController'
})
.when('/sign-up', {
templateUrl: 'tpl/sign-up.html',
controller: 'SignUpController'
})
.when('/my-info', {
templateUrl: 'tpl/my-info.html',
controller: 'MyInfoController'
})
.otherwise({ redirectTo: '/lunch-check' });


// optional: hash-bang only (default). No HTML5 mode needed here.
// $locationProvider.hashPrefix('');
}


ShellController.$inject = ['$scope', '$location'];
function ShellController($scope, $location) {
$scope.isActive = function(path) {
return $location.path() === path;
};
})();
