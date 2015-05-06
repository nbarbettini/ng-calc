'use strict';
app.factory('calculatorService', [function () {
	var _digits = '';
	
	var _allClear = function () {
		_digits = '';
	};
	
	var _getDigits = function() {
		if (_digits.length === 0) return 0;
		return parseInt(_digits, 10);
	};
	
	var _pushDigit = function(newDigit) {
		if (newDigit.length > 1) return;
		
		var allowed = '0123456789.';
		if (allowed.indexOf(newDigit) == -1) return;
		
		_digits += newDigit;
	};
	
	var service =  {
		allClear: _allClear,
		getDigits: _getDigits,
		pushDigit: _pushDigit
	};
	return service;
}]);