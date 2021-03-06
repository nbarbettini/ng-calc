(function() {
	'use strict';
	app.factory('historyService', function() {
		var _stack = [];
		var _allowedOperators = '/*-+%';
		
		var _count = function() {
			return _stack.length;
		};
		
		var _push = function(item) {
			if (!isValid(item)) return false;
			
			_stack.push(item);
			console.log(item.op0 + ' ' + item.operator + ' ' + item.op1 + ' = ' + item.result);
			
			return true;
		};
		
		var _pop = function() {
			if (_count() > 0)
				return _stack.pop();
			else
				return false;
		};
		
		var _getHistory = function() {
			return deepCopy(_stack);
		};
		
		function isValid(item) {
			if (typeof(item) !== 'object') return false;
			if (isNaN(parseFloat(item['op0']))) return false;
			if (isNaN(parseFloat(item['op1']))) return false;
			if (_allowedOperators.indexOf(item['operator']) === -1) return false;
			if (isNaN(parseFloat(item['result']))) return false;
			
			return true;
		}
		
		function deepCopy(source) {
			var result = Array.isArray(source) ? [] : {};
			var key, value;
			
			for (key in source) {
				value = source[key];
				result[key] = (typeof(value) === 'object') ? deepCopy(value) : value;
			}
			
			if (Array.isArray(source))
				result.reverse();
			return result;
		}
		
		// Service interface
		var service = {
			count: _count,
			push: _push,
			pop: _pop,
			getHistory: _getHistory
		};
		return service;
	});
})();