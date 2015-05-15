(function () {
	'use strict';
	
	angular.module('ng-calc')
	.controller('calculatorController',  ['inputService', 'arithmeticService', 'historyService',
	function (inputService, arithmeticService, historyService) {
		var vm = this;
		var _operator = '';
		var _result = '';
		var _resultPristine = true;
		
		vm.keyHandler = function(keyEvent) {
			var char = String.fromCharCode(keyEvent.which);
			
			if ('0123456789/*-+%'.indexOf(char) === -1) return;
			
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
			if (_resultPristine)
				return _result;
				
			var value = inputService.currentValue().toString();
			var decimalInValue = value.indexOf('.') > -1;
			// Display trailing decimal if value is "0."
			if (inputService.decimalPresent() && !decimalInValue)
				value += '.';
				
			return value;
		};
		
		vm.getOperator = function() {
			switch(_operator) {
				case '*': return '&times;';
				case '/': return '&divide;';
				default: return _operator;
			}
		};
		
		vm.getStoredOperand = function() {
			if (inputService.currentOperand() === 0) return '';
			
			return inputService.getOperands()[0].toString();
		};
		
		vm.press = function(digit) {
			if (_resultPristine && _operator === '')
				vm.clear();
			_resultPristine = false;
			
			inputService.push(digit);
		};
		
		vm.clear = function() {
			inputService.allClear();
			_operator = '';
			_result = '';
			_resultPristine = false;
		};
		
		// Operator buttons
		vm.plus = function() {
			_chain();			
			_operator = '+';
			inputService.shift(true);
		};
		vm.minus = function() {
			_chain();
			_operator = '-';
			inputService.shift(true);
		};
		vm.multiply = function() {
			_chain();
			_operator = '*';
			inputService.shift(true);
		};
		vm.divide = function() {
			_chain();
			_operator = '/';
			inputService.shift(true);
		};
		vm.negate = function() {
			_chain();
			_resultPristine = false;
			inputService.negate();
		};
		vm.back = function() {
			if (!_resultPristine)
				inputService.backSpace();
		}
		
		var _chain = function() {
			// Support operator chaining
			if (_operator !== '' && inputService.currentOperand() === 1)
				vm.equals();
		}
		
		vm.equals = function() {
			if (_operator === '') return;
			
			_result = arithmeticService.compute(
				inputService.getOperands()[0],
				inputService.getOperands()[1],
				_operator
			);
			historyService.push({
				op0: inputService.getOperands()[0],
				op1: inputService.getOperands()[1],
				operator: _operator,
				result: _result
			});
			
			inputService.allClear();
			inputService.push(_result);
			_operator = '';
			_resultPristine = true;
		};
	}]);
})();