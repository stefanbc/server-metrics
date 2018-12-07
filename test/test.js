"use strict";

import chai from 'chai';
import chaiAsPromised from "chai-as-promised";

import { ServerStats } from '../index';

const expect = chai.expect;
const should = chai.should();
chai.use(chaiAsPromised);

chai.Assertion.addProperty('uppercase', () => {
    let obj = this._obj;
    new chai.Assertion(obj).to.be.a('string');

    this.assert(
        obj === obj.toUpperCase() // adapt as needed
        , 'expected #{this} to be all uppercase'    // error message when fail for normal
        , 'expected #{this} to not be all uppercase'  // error message when fail for negated
    );
});

chai.Assertion.addProperty('lowercase', () => {
    let obj = this._obj;
    new chai.Assertion(obj).to.be.a('string');

    this.assert(
        obj === obj.toLowerCase() // adapt as needed
        , 'expected #{this} to be all lowercase'    // error message when fail for normal
        , 'expected #{this} to not be all lowercase'  // error message when fail for negated
    );
});

describe('Server Stats', () => {

    const data = new ServerStats('basic');

    describe('Method tests', () => {

        // it('Check prettify method should be uppercase', () => {
        //     return expect(data.prettifyMethod('post')).to.be.uppercase;
        // });

        // it('Check prettify method should be lowercase', () => {
        //     return expect(data.prettifyEndpoint('BODY')).to.be.lowercase;
        // });

        // it('The request method should be accepted', () => {
        //     return expect(data.checkMethod('POST')).to.be.true;
        // });

        // it('Set options should return an object', () => {
        //     return expect(data.setRequestOptions('POST', 'body')).to.be.an('object');
        // });

        // it('Get endpoint url should be a string with dot', () => {
        //     return expect(data.getEndpointUrl('body.left_lower_leg')).to.be.a('string');
        // });

        // it('Get endpoint url should be a string with slash', () => {
        //     return expect(data.getEndpointUrl('body/left_lower_leg')).to.be.a('string');
        // });

        // it('Request method returns a promise with params', () => {
        //     return expect(data.request('body', 'GET')).to.be.a('promise');
        // });

        // it('Request method returns a promise without params', () => {
        //     return data.request().should.be.rejectedWith(Error);
        // });

    });

});