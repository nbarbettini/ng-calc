(function () {
	'use strict';
	
	angular.module('ng-calc')
	.controller('calculatorController',  ['digitService', 'arithmeticService',
	function (digitService, arithmeticService) {
		var vm = this;
		var _operator = '';
		var _result = '';
		
		vm.keyHandler = function(keyEvent) {
			var char = String.fromCharCode(keyEvent.which);
			switch (char) {
				case '+':
					vm.plus();
					break;
				case '-':
					vm.minus();
					break;
				case '*':
					vm.multiply();
					break;
				case '/':
					vm.divide();
					break;
				default:
					vm.press(char);
			}
		};
		
		vm.controlKeyHandler = function(keyEvent) {
			if (keyEvent.which === 13) {
				vm.equals();
				return;
			} else if (keyEvent.which === 27) {
				vm.clear();
				return;
			}
		};
		
		vm.getDigits = function() {
			// Needs refactoring. Will make it pretty later :)
			if (_result === '') {
				var value = digitService.currentValue().toString();
				var decimalInValue = value.indexOf('.') > -1;
				
				// Display trailing decimal if value is "0."
				if (digitService.decimalPresent() && !decimalInValue)
					value += '.';
					
				return value;
			} else {
				return _result;
			}
		};
		
		vm.getOperator = function() {
			switch(_operator) {
				case '*': return '&times;';
				case '/': return '&divide;';
				default: return _operator;
			}
		};
		
		vm.getStoredOperand = function() {
			if (digitService.currentOperand() === 0) return '';
			
			return digitService.getOperands()[0].toString();
		};
		
		vm.press = function(digit) {
			digitService.push(digit);
		};
		
		vm.clear = function() {
			digitService.allClear();
			_operator = '';
			_result = '';
		};
		
		// Operator buttons
		vm.plus = function() {
			_operator = '+';
			digitService.shift();
		};
		vm.minus = function() {
			_operator = '-';
			digitService.shift();
		};
		vm.multiply = function() {
			_operator = '*';
			digitService.shift();
		};
		vm.divide = function() {
			_operator = '/';
			digitService.shift();
		};
		
		vm.equals = function() {
			_result = arithmeticService.compute(
				digitService.getOperands()[0],
				digitService.getOperands()[1],
				_operator
			);
		};
	}]);
})();