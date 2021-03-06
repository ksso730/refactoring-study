
// 데이터 모으기
export const createStatementData = (invoice, plays) => {
    
    const totalAmount = (data) => {
        return data.performances
            .reduce((total, perf)=> total+perf.amount, 0);
    }

    const totalVolumeCredits = (data) => {
        return data.performances
            .reduce((total, perf) => total + perf.volumeCredits, 0);
    }

    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function enrichPerformance (aPerformance) {
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    
        function playFor (aPerformance) {
            return plays[aPerformance.playID];
        }
    
        function amountFor (aPerformance) {
            let result = 0;
    
                switch (aPerformance.play.type) {
                    case "tragedy":
                        result = 40000;
                        if (aPerformance.audience > 30) {
                                result += 1000 *(aPerformance.audience -30);
                            }
                        break;
                    case "comedy":
                        result = 30000;
                        if (aPerformance.audience > 20) {
                            result += 10000 + 500 *(aPerformance.audience -20);
                        }
                        result += 300 * aPerformance.audience;
                        break;
                    default:
                        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
                }
            return result;
        }
    
        function volumeCreditsFor (aPerformance) {
            let result = 0;
            //포인트 적립
            result += Math.max(aPerformance.audience -30, 0);
            // 희극 관객 5명마다 추가 포인트 제공
            if ("comedy" == aPerformance.play.type)
                result += Math.floor(aPerformance.audience/5);
            return result;
        }
    }
}
