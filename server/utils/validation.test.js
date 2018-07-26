const expect = require('expect');

const {isRealString} = require('./validation');

describe('getRealString', () => {
    it('should reject non-string values', () => {
        let str = 100;
        const result = isRealString(str);
        expect(result).toBe(false);
    });

    it('should reject strings with only spaces', () => {
        let str = '   ';
        const result = isRealString(str);
        expect(result).toBe(false);
    });

    it('should allow strings with non-space characters', () => {
        let str = 'Gregory';
        const result = isRealString(str);
        expect(result).toBe(true);
    });
});