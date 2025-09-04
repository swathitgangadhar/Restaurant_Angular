(function () {
'use strict';


angular.module('ShoppingListCheckOff', [])
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController);


function ShoppingListCheckOffService() {
var service = this;


var toBuyItems = [
{ name: 'cookies', quantity: 10 },
{ name: 'chocolate', quantity: 5 },
{ name: 'bread', quantity: 3 },
{ name: 'milk', quantity: 2 },
{ name: 'eggs', quantity: 12 }
];


var alreadyBoughtItems = [];


service.getToBuyItems = function () { return toBuyItems; };
service.getBoughtItems = function () { return alreadyBoughtItems; };
service.buyItem = function (index) {
var item = toBuyItems.splice(index, 1)[0];
alreadyBoughtItems.push(item);
};
}


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
var vm = this;
vm.items = ShoppingListCheckOffService.getToBuyItems();
vm.buyItem = function(index) { ShoppingListCheckOffService.buyItem(index); };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
var vm = this;
vm.items = ShoppingListCheckOffService.getBoughtItems();
}
})();
