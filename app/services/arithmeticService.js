(function() {
	'use strict';
	
	angular.module('ng-calc')
	.factory('arithmeticService', [function () {
		// Service methods
		var _compute = function(op1, op2, operation) {
			var parsedOperand1 = parseFloat(op1);
			var parsedOperand2 = parseFloat(op2);
			if (isNaN(parsedOperand1) || isNaN(parsedOperand2)) return 0;
			
			switch(operation) {
				case '+': return add(parsedOperand1, parsedOperand2);
				case '-': return subtract(parsedOperand1, parsedOperand2);
				case '*': return multiply(parsedOperand1, parsedOperand2);
				case '/': return divide(parsedOperand1, parsedOperand2);
				default: return 0;
			}
		};
		
		// Helper methods
		function add(op1, op2) { return op1 + op2; }
		function subtract(op1, op2) { return op1 - op2; }
		function multiply(op1, op2) { return op1 * op2; }
		function divide(op1, op2) { return op1 / op2; }
		
		// Service interface
		var service = {
			compute: _compute
		};
		return service;
	}]);	
})();