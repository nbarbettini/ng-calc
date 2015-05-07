'use strict'; 
describe('digitService', function () {
	var digitService;
	
	// load some dependencies before each 'it' is run
	beforeEach(function() {
		module('ng-calc');
		
		inject(function(_digitService_) {
			digitService = _digitService_;
		});
	});
	
	/* Basic behavior */
	it('should return 0 for empty digits', function () {
		expect(digitService.getOperands()[0]).toBe(0);
		expect(digitService.getOperands()[1]).toBe(0);
	});
	
	it('should allow a digit to be pushed as a string', function() {
		digitService.push('1');
		expect(digitService.currentValue()).toBe(1);
	});
	
	it('should allow a digit to be pushed as a number', function() {
		digitService.push(2);
		expect(digitService.currentValue()).toBe(2);
	});
	
	it('should not allow bad characters to be pushed', function() {
		digitService.push('x');
		expect(digitService.currentValue()).toBe(0);
	});
	
	it('should allow more than one digit to be pushed', function() {
		digitService.push('123.4');
		expect(digitService.currentValue()).toBe(123.4);
	});
	
	it('should handle an empty string being pushed', function() {
		digitService.push('');
		expect(digitService.currentValue()).toBe(0);
	});
	
	it('should support decimals', function() {
		digitService.push(1);
		digitService.push('.');
		expect(digitService.currentValue()).toBe(1);
		
		digitService.push(5);
		expect(digitService.currentValue()).toBe(1.5);
	});
	
	it('should allow a decimal first', function() {
		digitService.push('.');
		expect(digitService.currentValue()).toBe(0);
		
		digitService.push(1);
		expect(digitService.currentValue()).toBe(0.1);
	});
	
	it('should set flag when decimal is present', function() {
		expect(digitService.decimalPresent()).toBe(false);
		
		digitService.push('.');
		expect(digitService.decimalPresent()).toBe(true);
	});
	
	it('should not allow a second decimal', function() {
		digitService.push(1);
		digitService.push('.');
		digitService.push(5);
		expect(digitService.currentValue()).toBe(1.5);
		
		digitService.push('.');
		digitService.push(9);
		// will ignore the second decimal
		expect(digitService.currentValue()).toBe(1.59);
	});
	
	/* Multiple operands */
	
	it('should allow pushing digits to the second operand', function() {
		digitService.push(5);
		digitService.shift();
		digitService.push(10);
		
		expect(digitService.currentValue()).toBe(10);
	});
	
	it('should allow shifting back to the first operand', function() {
		digitService.push(5);
		digitService.shift();
		digitService.push(4);
		digitService.unshift();
		digitService.push(3);
		
		expect(digitService.currentValue()).toBe(53);
	});
	
	it('should keep both operands in memory', function() {
		digitService.push(3.14);
		digitService.shift();
		digitService.push(6.28);
		
		expect(digitService.getOperands()[0]).toBe(3.14);
		expect(digitService.getOperands()[1]).toBe(6.28);
	});
	
	it('should clear the current operand', function() {
		digitService.push(1);
		digitService.shift();
		digitService.push(2);
		
		digitService.clearOperand();
		
		expect(digitService.getOperands()[0]).toBe(1);
		expect(digitService.getOperands()[1]).toBe(0);
	});
	
	it('should allow each operand to be set to a specific value', function() {
		digitService.setOperand(0, 3.14);
		digitService.setOperand(1, 6.28);
		
		expect(digitService.getOperands()[0]).toBe(3.14);
		expect(digitService.getOperands()[1]).toBe(6.28);
	});
	
	it('should get current operand', function () {
		expect(digitService.currentOperand()).toBe(0);
		
		digitService.shift();
		expect(digitService.currentOperand()).toBe(1);
		
		digitService.unshift();
		expect(digitService.currentOperand()).toBe(0);
	});
});