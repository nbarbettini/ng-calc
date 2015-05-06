'use strict';
app.controller('calculatorController',  ['calculatorService', function (calculatorService) {
	var vm = this;
	
	vm.getDigits = calculatorService.getDigits().toString();
	
	vm.press = function(digit) {
		calculatorService.push(digit);
	};
	
	vm.clear = function() {
		calculatorService.allClear();
	};
}]);