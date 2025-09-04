(function() {
'use strict';


angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);


LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
$scope.lunchMenu = '';
$scope.message = '';


$scope.checkLunch = function() {
var menuItems = ($scope.lunchMenu || '').trim();
if (menuItems === '') {
$scope.message = 'Please enter data first';
$scope.state = 'error';
return;
}
var items = menuItems.split(',').map(function(x){return x.trim();}).filter(Boolean);
if (items.length <= 3) {
$scope.message = 'Enjoy!';
$scope.state = 'ok';
} else {
$scope.message = 'Too much!';
$scope.state = 'error';
}
};
}
})();
