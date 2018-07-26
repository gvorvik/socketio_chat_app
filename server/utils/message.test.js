const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Greg';
        const text = 'Some Message';
        const message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Greg';
        const lat = 1;
        const long = 1;
        url = 'https://www.google.com/maps?q=1,1';

        const message = generateLocationMessage(from, lat, long);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
        expect(message.url).toBe('https://www.google.com/maps?q=1,1');
    })
})