import {createRequire} from "module";
import { createStatementData } from "./createStatement.js";

const require = createRequire(import.meta.url);
const invoicesData = require("./data/invoices.json");
const playData = require("./data/play.json");

const invoices = JSON.parse(JSON.stringify(invoicesData));
const plays = JSON.parse(JSON.stringify(playData));

function usd (aNumber) {
    return new Intl.NumberFormat("en-US", 
                        { style: "currency", currency: "USD",
                        minimumFractionDigits: 2}).format(aNumber/100);
}

const renderHtml = (data) => {
    let result = `<h1>청구내역 (${data.customer})</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
    for (let perf of data.performances) {
        result += `<tr><td>${perf.play.name}</td><td>${perf.audience}석</td>`
        result += `<td>${usd(perf.amount)}</td></tr>\n`;
    } 
    result += "</table>\n";
    
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립포인트: <em>${data.totalVolumeCredits}점</em></p>\n`;
    return result;
}

const htmlStatement = (invoice, plays) => {
    return renderHtml(createStatementData(invoice, plays));
}

for (let invoice of invoices){
    const result = htmlStatement(invoice, plays);
    console.log(result);
}