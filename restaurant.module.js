(function(){
'use strict';


angular.module('restaurantApp', [])
.service('UserService', UserService)
.controller('MainController', MainController)
.controller('SignUpController', SignUpController)
.controller('MyInfoController', MyInfoController);


// ---------------- User Service ----------------
function UserService() {
var svc = this;
var user = null; // { firstName, lastName, email, phone, favoriteDish }


svc.saveUser = function(u) { user = angular.copy(u); };
svc.getUser = function() { return user; };
}


// ---------------- Categories/Items Controller ----------------
MainController.$inject = ['$scope', '$http'];
function MainController($scope, $http) {
$scope.categories = [];
$scope.items = [];


$scope.getAllCategories = function() {
return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/categories.json')
.then(function(res){ return res.data; });
};


$scope.getItemsForCategory = function(shortName) {
return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/' + shortName + '.json')
.then(function(res){ return res.data; });
};


$scope.viewCategories = function() {
$scope.getAllCategories().then(function(categories){
$scope.categories = categories;
$scope.items = [];
});
};


$scope.viewItems = function(shortName) {
$scope.getItemsForCategory(shortName).then(function(items){
$scope.items = items && items.menu_items ? items.menu_items : [];
});
};
}


// ---------------- Sign Up / My Info ----------------
SignUpController.$inject = ['$scope', '$http', 'UserService'];
function SignUpController($scope, $http, UserService) {
$scope.user = {};
$scope.menuItemError = false;
$scope.userSaved = false;
$scope.favoriteDishItem = null;


$scope.checkMenuItem = function() {
if (!$scope.user.favoriteDish || $scope.user.favoriteDish.length < 2) {
$scope.menuItemError = true;
})();
