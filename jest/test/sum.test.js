const sum = require('../src/sum');

beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
describe('sum', () => {
    beforeAll(() => console.log('2 - beforeAll'));
    afterAll(() => console.log('2 - afterAll'));
    beforeEach(() => console.log('2 - beforeEach'));
    afterEach(() => console.log('2 - afterEach'));

    test('adds 1 + 3 to equal 4', () => {
        expect(sum(1, 3)).toBe(4);
    });
   
})
