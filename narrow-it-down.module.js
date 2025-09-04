(function () {
'use strict';


angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
var ctrl = this;
ctrl.searchTerm = '';
ctrl.foundItems = [];


ctrl.narrowDown = function () {
if (!ctrl.searchTerm) {
ctrl.foundItems = [];
return;
}
MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
.then(function (items) { ctrl.foundItems = items; })
.catch(function (error) { console.log('Error retrieving data', error); });
};


ctrl.removeItem = function (index) { ctrl.foundItems.splice(index, 1); };
}


MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
var service = this;
service.getMatchedMenuItems = function (searchTerm) {
return $http({ method:'GET', url:'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json' })
.then(function (response) {
var foundItems = [];
var data = response.data || {};
Object.keys(data).forEach(function(category) {
var cat = data[category];
if (cat && Array.isArray(cat.menu_items)) {
cat.menu_items.forEach(function(item){
if (item.description && item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
foundItems.push(item);
}
});
}
});
return foundItems;
});
};
}


function FoundItemsDirective() {
return {
})();
