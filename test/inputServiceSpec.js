(function() {
	'use strict'; 
	describe('inputService', function () {
		var inputService;
		
		// load some dependencies before each 'it' is run
		beforeEach(function() {
			module('ng-calc');
			
			inject(function(_inputService_) {
				inputService = _inputService_;
			});
		});
		
		/* Basic behavior */
		
		it('should return 0 for empty digits', function () {
			expect(inputService.getOperands()[0]).toBe(0);
			expect(inputService.getOperands()[1]).toBe(0);
		});
		
		it('should allow a digit to be pushed as a string', function() {
			inputService.push('1');
			expect(inputService.currentValue()).toBe(1);
		});
		
		it('should allow a digit to be pushed as a number', function() {
			inputService.push(2);
			expect(inputService.currentValue()).toBe(2);
		});
		
		it('should not allow bad characters to be pushed', function() {
			inputService.push('x');
			expect(inputService.currentValue()).toBe(0);
		});
		
		it('should allow more than one digit to be pushed', function() {
			inputService.push('123.4');
			expect(inputService.currentValue()).toBe(123.4);
		});
		
		it('should handle an empty string being pushed', function() {
			inputService.push('');
			expect(inputService.currentValue()).toBe(0);
		});
		
		it('should support decimals', function() {
			inputService.push(1);
			inputService.push('.');
			expect(inputService.currentValue()).toBe(1);
			
			inputService.push(5);
			expect(inputService.currentValue()).toBe(1.5);
		});
		
		it('should allow a decimal first', function() {
			inputService.push('.');
			expect(inputService.currentValue()).toBe(0);
			
			inputService.push(1);
			expect(inputService.currentValue()).toBe(0.1);
		});
		
		it('should set flag when decimal is present', function() {
			expect(inputService.decimalPresent()).toBe(false);
			
			inputService.push('.');
			expect(inputService.decimalPresent()).toBe(true);
		});
		
		it('should not allow a second decimal', function() {
			inputService.push(1);
			inputService.push('.');
			inputService.push(5);
			expect(inputService.currentValue()).toBe(1.5);
			
			inputService.push('.');
			inputService.push(9);
			// will ignore the second decimal
			expect(inputService.currentValue()).toBe(1.59);
		});
		
		it('should support negative numbers', function() {
			inputService.push(-321.5);
			
			expect(inputService.currentValue()).toBe(-321.5);
		});
		
		/* Control behavior */
		
		it('should negate the current operator', function() {
			inputService.push(100.2);
			
			inputService.negate();
			
			expect(inputService.currentValue()).toBe(-100.2);
		});
		
		it('should delete the last character', function() {
			inputService.push(123);
			
			inputService.backSpace();
			
			expect(inputService.currentValue()).toBe(12);
		});
		
		/* Multiple operands */
		
		it('should allow pushing digits to the second operand', function() {
			inputService.push(5);
			inputService.shift();
			inputService.push(10);
			
			expect(inputService.currentValue()).toBe(10);
		});
		
		it('should copy first operand into second when shifting with shouldCopy', function() {
			inputService.push(5);
			inputService.shift(true);
			
			expect(inputService.getOperands()[1]).toBe(5);
		});
		
		it('should treat the second operand as volatile when copied during shift', function() {
			inputService.push(5);
			inputService.shift(true);
			expect(inputService.currentValue()).toBe(5);
			
			inputService.push(1);
			expect(inputService.currentValue()).toBe(1);
		});
		
		it('should allow shifting back to the first operand', function() {
			inputService.push(5);
			inputService.shift();
			inputService.push(4);
			inputService.unshift();
			inputService.push(3);
			
			expect(inputService.currentValue()).toBe(53);
		});
		
		it('should keep both operands in memory', function() {
			inputService.push(3.14);
			inputService.shift();
			inputService.push(6.28);
			
			expect(inputService.getOperands()[0]).toBe(3.14);
			expect(inputService.getOperands()[1]).toBe(6.28);
		});
		
		it('should clear the current operand', function() {
			inputService.push(1);
			inputService.shift();
			inputService.push(2);
			
			inputService.clearOperand();
			
			expect(inputService.getOperands()[0]).toBe(1);
			expect(inputService.getOperands()[1]).toBe(0);
		});
		
		it('should allow each operand to be set to a specific value', function() {
			inputService.setOperand(0, 3.14);
			inputService.setOperand(1, 6.28);
			
			expect(inputService.getOperands()[0]).toBe(3.14);
			expect(inputService.getOperands()[1]).toBe(6.28);
		});
		
		it('should get current operand', function () {
			expect(inputService.currentOperand()).toBe(0);
			
			inputService.shift();
			expect(inputService.currentOperand()).toBe(1);
			
			inputService.unshift();
			expect(inputService.currentOperand()).toBe(0);
		});
	});
})();