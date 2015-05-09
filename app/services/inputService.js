(function() {
	'use strict';
	app.factory('inputService', [function () {
		var _operands = [];
		var _currentOperand = 0;
		var _operand1IsVolatile = false;
		
		// Service methods
		var _allClear = function() {
			_operands.length = 0;
			_operands.push('', '');
			_unshift();
		};
		
		var _clearOperand = function(operand) {
			if (typeof(operand) === 'undefined')
				operand = _currentOperand;
			_operands[operand] = '';
		}
		
		var _currentValue = function() {
			return getOperandDigits(_operands[_currentOperand]);
		};
		
		var _getCurrentOperand = function() {
			return _currentOperand;
		}
		
		var _getOperands = function() {
			return new Array(
					getOperandDigits(_operands[0]),
					getOperandDigits(_operands[1]));
		};
		
		var _setOperand = function(operand, value) {
			if (operand !== 0 && operand !== 1) return;
			
			_operands[operand] = value.toString();
		};
		
		var _decimalPresent = function() {
			return (_operands[_currentOperand].indexOf('.') > -1);
		}
		
		var _push = function(input) {
			var newDigits = input.toString();
			var newDigit = '';
			var isNegative = false;
			var hasDecimal = false;
			
			for (var i = 0; i < newDigits.length; i++) {
				newDigit = newDigits.toString()[i];
				
				// Handle leading negative sign
				if (i === 0 && newDigit === '-') {
					isNegative = true;
					continue;
				}
				
				// Handle decimal point
				hasDecimal = hasDecimal || _operands[_currentOperand].indexOf('.') > -1;
				if (newDigit === '.' && hasDecimal) return;
				
				var isAllowed = '0123456789.'.indexOf(newDigit) > -1;
				if (!isAllowed) return;
				
				if (_currentOperand === 1 && _operand1IsVolatile)
					_operands[_currentOperand] = '';
				_operand1IsVolatile = false;
				
				_operands[_currentOperand] += newDigit;
			}
			
			if (isNegative)
				_negate();
		};
		
		var _shift = function(shouldCopy) {
			_currentOperand = 1;
			if (shouldCopy) {
				_operands[1] = _operands[0];
				_operand1IsVolatile = true;
			}
		}
		var _unshift = function() {
			_currentOperand = 0;
		}
		
		var _negate = function() {
			var current = _currentValue();
			if (current !== 0)
				_setOperand(_currentOperand, current * -1);
		}
		
		var _backSpace = function() {
			var current = _operands[_currentOperand];
			if (current.length > 0)
				_setOperand(_currentOperand, current.substr(0, current.length - 1));
		}
		
		// Helper methods
		function getOperandDigits(operandString) {
			if (operandString.length === 0) return 0;
			if (operandString === '.') return 0;
			
			return parseFloat(operandString, 10);
		}
		
		// Service interface
		var service =  {
			allClear: _allClear,
			clearOperand: _clearOperand,
			currentValue: _currentValue,
			currentOperand: _getCurrentOperand,
			getOperands: _getOperands,
			setOperand: _setOperand,
			decimalPresent: _decimalPresent,
			push: _push,
			shift: _shift,
			unshift: _unshift,
			negate: _negate,
			backSpace: _backSpace
		};
		
		// Initialize
		service.allClear();
		
		return service;
	}]);
})();