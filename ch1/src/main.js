import {createRequire} from "module";
import { format } from "path";

const require = createRequire(import.meta.url);
const invoicesData = require("./data/invoices.json");
const playData = require("./data/play.json");

const invoices = JSON.parse(JSON.stringify(invoicesData));
const plays = JSON.parse(JSON.stringify(playData));

const totalVolumeCredits = (invoice) => {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
        //포인트 적립
        volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
}

const usd = (aNumber) => {
    return new Intl.NumberFormat("en-US", 
                        { style: "currency", currency: "USD",
                        minimumFractionDigits: 2}).format(aNumber/100);
}

const volumeCreditsFor = (perf) => {
    let result = 0;
    //포인트 적립
    result += Math.max(perf.audience -30, 0);
    // 희극 관객 5명마다 추가 포인트 제공
    if ("comedy" == playFor(perf).type)
        result += Math.floor(perf.audience/5);
    return result;
}

const playFor = (aPerformance) => {
    return plays[aPerformance.playID];
}

const amountFor = (aPerformance) => {
    let result = 0;

        switch (playFor(aPerformance).type) {
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
                throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
        }
    return result;
}

const statement = (invoice) => {
    let totalAmaount = 0;
    let result = `=== 청구내역 (${invoice.customer})\n`;
    
    for (let perf of invoice.performances) {
        // 청구내역 출력
        result += `\t${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
        totalAmaount += amountFor(perf);
    }                              
    
    result += `총액: ${usd(totalAmaount)}\n`;
    result += `적립포인트: ${totalVolumeCredits(invoice)}점\n`;
    return result;
}

for (let invoice of invoices){
    const result = statement(invoice, plays);
    console.log(result);
}