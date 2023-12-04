const { expect } = require("chai");
const { assert } = require("chai");
const should = require("chai").should();

describe('rootSuite', function () {
    var foo = 'bar',
        beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

    describe('assert', function () {
        it('typeOf', function () {
            assert.typeOf(foo, 'string')
        })
        it('typeOf with optional message', function () {
            assert.typeOf(foo, 'string', 'foo is a string');
        })
        it('equal', function () {
            assert.equal(foo, 'bar', 'foo equal `bar`');
        })
        it('lengthOf', function () {
            assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
        })
        it('lengthOf 2', function () {
            assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
        })
    })

    describe("expect", function () {
        it("to.be.a", function () {
            expect(foo).to.be.a('string');
        })
        it("to.equal", function () {
            expect(foo).to.equal('bar');
        })
        it("to.have.lengthOf", function () {
            expect(foo).to.have.lengthOf(3);
        })
        it("to.have.property", function () {
            expect(beverages).to.have.property('tea').with.lengthOf(3);
        })
    })

    describe("should", function () {
        it("should.be.a", function () {
            foo.should.be.a('string');
        })
        it("should.equal", function () {
            foo.should.equal('bar');
        })
        it("should.have.lengthOf", function () {
            foo.should.have.lengthOf(3);
        })
        it("should.have.property", function () {
            beverages.should.have.property('tea').with.lengthOf(3);
        })
    })
})