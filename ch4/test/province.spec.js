import assert from 'assert';
import { Province, sampleProvinceData } from '../province'


//describe: 모카 테스트 단위 지정
// it: 개별적 테스트케이스
describe('province', function(){
    it('shortfall', function(){
        const asia = new Province(sampleProvinceData());
        assert.equal(asia.shortfall, 5);
    })
})
