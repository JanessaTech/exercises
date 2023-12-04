var assert = require('assert')

describe('Array', function() {
    describe('#indexof()', function () {
        it.only('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1)
        })
        it('should return 0 when the value is not present', function () {
            assert.equal([4, 5, 6].indexOf(4), 0)
        })
    })
})