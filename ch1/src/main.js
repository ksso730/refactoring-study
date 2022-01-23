import {createRequire} from "module";
import { format } from "path";

const require = createRequire(import.meta.url);
const invoicesData = require("./data/invoices.json");
const playData = require("./data/play.json");

const invoices = JSON.parse(JSON.stringify(invoicesData));
const plays = JSON.parse(JSON.stringify(playData));

const renderPlainText = (data) => {
    
    const usd = (aNumber) => {
        return new Intl.NumberFormat("en-US", 
                            { style: "currency", currency: "USD",
                            minimumFractionDigits: 2}).format(aNumber/100);
    }

    let result = `=== 청구내역 (${data.customer})\n`;

    for (let perf of data.performances) {
        // 청구내역 출력
        result += `\t${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
    }    
    
    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립포인트: ${data.totalVolumeCredits}점\n`;
    return result;
}

// 데이터 모으기
const enrichPerformance = (aPerformance) => {
    const playFor = (aPerformance) => {
        return plays[aPerformance.playID];
    }

    const amountFor = (aPerformance) => {
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

    const volumeCreditsFor = (aPerformance) => {
        let result = 0;
        //포인트 적립
        result += Math.max(aPerformance.audience -30, 0);
        // 희극 관객 5명마다 추가 포인트 제공
        if ("comedy" == aPerformance.play.type)
            result += Math.floor(aPerformance.audience/5);
        return result;
    }


    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
}

const statement = (invoice) => {
    
    const totalAmount = (data) => {
        let result = 0;
        for (let perf of data.performances) {
            // 청구내역 출력
            result += perf.amount;
        }
        return result;
    }

    const totalVolumeCredits = (data) => {
        let volumeCredits = 0;
        for (let perf of data.performances) {
            //포인트 적립
            volumeCredits += perf.volumeCredits;
        }
        return volumeCredits;
    }

    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return renderPlainText(statementData, plays);
}

for (let invoice of invoices){
    const result = statement(invoice);
    console.log(result);
}