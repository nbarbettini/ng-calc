'use strict';
app.factory('digitService', [function () {
	var _operands = [];
	var _currentOperand = 0;
	
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
		
		for (var i = 0; i < newDigits.length; i++) {
			newDigit = newDigits.toString()[i];
			
			var alreadyHasDecimal = _operands[_currentOperand].indexOf('.') > -1;
			if (newDigit === '.' && alreadyHasDecimal) return;
			
			var isAllowed = '0123456789.'.indexOf(newDigit) > -1;
			if (!isAllowed) return;
			
			_operands[_currentOperand] += newDigit;
		}
	};
	
	var _shift = function() {
		_currentOperand = 1;
	}
	var _unshift = function() {
		_currentOperand = 0;
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
	};
	
	// Initialize
	service.allClear();
	
	return service;
}]);