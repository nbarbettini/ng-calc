'use strict';
describe('calculatorService tests', function () {
	var calculatorService;
	
	// load some dependencies before each 'it' is run
	beforeEach(function() {
		module('ng-calc');
		
		inject(function(_calculatorService_) {
			calculatorService = _calculatorService_;
		});
	});
	
	it('should return 0 for empty digits', function () {
		expect(calculatorService.getDigits()).toBe(0);
	});
	
	it('should allow a digit to be pushed as a string', function() {
		calculatorService.pushDigit('1');
		expect(calculatorService.getDigits()).toBe(1);
	});
	
	it('should allow a digit to be pushed as a number', function() {
		calculatorService.pushDigit(2);
		expect(calculatorService.getDigits()).toBe(2);
	});
	
	it('should not allow bad characters to be pushed', function() {
		calculatorService.pushDigit('x');
		expect(calculatorService.getDigits()).toBe(0);
	});
});