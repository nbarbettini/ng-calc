(function() {
	'use strict'; 
	describe('arithmeticService', function () {
		var arithmeticService;
		
		// load some dependencies before each 'it' is run
		beforeEach(function() {
			module('ng-calc');
			
			inject(function(_arithmeticService_) {
				arithmeticService = _arithmeticService_;
			});
		});
		
		it('should add numbers', function() {
			expect(arithmeticService.compute(2.5, 3, '+')).toBe(5.5);
			expect(arithmeticService.compute(3, 2.5, '+')).toBe(5.5);
		});
		
		it('should subtract numbers', function () {
			expect(arithmeticService.compute(2.5, 3, '-')).toBe(-0.5);
			expect(arithmeticService.compute(3, 2.5, '-')).toBe(0.5);
		});
		
		it('should multiply numbers', function() {
			expect(arithmeticService.compute(12.5, 2, '*')).toBe(25);
			expect(arithmeticService.compute(2, 12.5, '*')).toBe(25);
		});
		
		it('should divide numbers', function() {
			expect(arithmeticService.compute(10, 2, '/')).toBe(5);
			expect(arithmeticService.compute(2, 10, '/')).toBe(0.2);
		});
		
		it('should handle bad input nicely', function() {
			expect(arithmeticService.compute('foo', 2, '+')).toBe(0);
			expect(arithmeticService.compute(2, 'foo', '+')).toBe(0);
			expect(arithmeticService.compute(2, 2, 'foo')).toBe(0);
		});
	});
})();

