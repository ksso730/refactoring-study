import assert from 'assert';
import { expect } from 'chai';
import { Province, sampleProvinceData } from '../province'


//describe: 모카 테스트 단위 지정
// it: 개별적 테스트케이스
describe('province', function(){

    let asia;
    beforeEach(function(){
        // 공유 객체 대신에 테스트마다 독립적으로 생성되도록 한다.
        asia = new Province(sampleProvinceData());
    });

    it('shortfall', function(){
        expect(asia.shortfall).equal(5);
    });

    // 총 수익 계산
    it('profit', function(){
        expect(asia.profit).equal(230);
    });

    it('change production', function(){
        asia.producers[0].production = 20;
        expect(asia.shortfall).equal(-6);
        expect(asia.profit).equal(330);
        
    });

    // 수요가 제로, 마이너스
    it('zero demand', function(){
        // asia.demand = 0;
        asia.demand = -1; // 인수가 음수라면 에러를 던지거나 무조건0으로 처리.
        expect(asia.shortfall).equal(-26);
        expect(asia.profit).equal(-10);
    });

    it('empty string demand', function(){
        asia.demand = "";
        expect(asia.shortfall).NaN;
        expect(asia.profit).NaN;
    });

})

// 컬렉션이 비어있을 때
describe('no producers', function(){
    let noProducers;
    beforeEach(function(){
        const data = {
            name: "No producers",
            producers: [],
            demand: 30,
            price: 20
        };
        noProducers = new Province(data);
    });
    it('shortfall', function(){
        expect(noProducers.shortfall).equal(30);
    });
    // 총 수익 계산
    it('profit', function(){
        expect(noProducers.profit).equal(0);
    });
    
});

describe('string for producers', function(){
    
    it('', function(){
        const data= {
            name: "String producers",
            producers: "",
            demand: 30,
            price: 20
        };
        const prov = new Province(data);
        expect(prov.shortfall).equal(0);
    });
});