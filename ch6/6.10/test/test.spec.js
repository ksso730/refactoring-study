import assert from 'assert';
import { expect } from 'chai';
import { enrichReading, readingData } from '../sample1';

describe('test1', function(){

    let baseReading;
    beforeEach(function(){
        baseReading = readingData;
    });

    it('check reading unchanged', function(){
        const oracle = _.cloneDeep(baseReading);
        enrichReading(baseReading);
        assert.deepEqual(baseReading, oracle);
    });

});