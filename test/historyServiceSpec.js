(function() {
	'use strict';
	describe('historyService', function() {
		var historyService;
		
		// load some dependencies before each 'it' is run
		beforeEach(function() {
			module('ng-calc');
			
			inject(function(_historyService_) {
				historyService = _historyService_;
			});
		});
		
		it('should start with a blank slate', function() {
			expect(historyService.count()).toBe(0);
		});
		
		it('should not allow invalid items to be pushed', function() {
			expect(historyService.push('foo')).toBe(false);
			expect(historyService.push({ foo: 'bar' })).toBe(false);
			expect(historyService.push({ op0: 5, op1: 10, operator: 'foo'})).toBe(false);
		});
		
		it('should store a history item as an object', function() {
			historyService.push({op0: 5, op1: 5, operator: '+' });
			
			expect(historyService.count()).toBe(1);
			expect(historyService.pop()).toEqual({ op0: 5, op1: 5, operator: '+' });
		});
		
		it('should retrieve items in lifo order', function() {
			historyService.push({ op0: 10, op1: 10, operator: '-' });
			historyService.push({ op0: 5, op1: 5, operator: '+' });
			
			expect(historyService.count()).toBe(2);
			expect(historyService.pop()).toEqual({ op0: 5, op1: 5, operator: '+' });
		});
		
		it('should return false if there is nothing to pop', function() {
			expect(historyService.pop()).toBe(false);
		});
		
		it('should return entire history in lifo order', function() {
			historyService.push({ op0: 10, op1: 10, operator: '-' });
			historyService.push({ op0: 5, op1: 5, operator: '+' });
			
			var history = historyService.getHistory();
			expect(history.length).toBe(2);
			expect(history[0]).toEqual({op0: 5, op1: 5, operator: '+' });
			expect(history[1]).toEqual({op0: 10, op1: 10, operator: '-' });
		});
	});
})();