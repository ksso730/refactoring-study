
function printOwing(invoice){
    
    // 1.배너 출력 로직을 함수로 추출
    printBanner();
    
    // 미해결 채무
    const outstanding = caculateOutstanding(invoice);
    
    // 마감일 기록(dueDate)
    recordDueDate(invoice);
    
    printDetails(invoice, outstanding);
    
}

function caculateOutstanding(invoice){
    let result = 0;
    for(const o of invoice.orders){
        result += o.amount; 
    }
    return result;
}

function recordDueDate(invoice){
    // Clock.today: 시스템 시계를 감싸는 객체
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() +30);
}

// 지역변수를 매개변수로 사용
function printDetails(invoice, outstanding){
    console.log(`고객명 : ${invoice.customer}`);
    console.log(`채무액 : ${outstanding}`);
    console.log(`마감일 : ${invoice.dueDate.toLocalDateString()}`);
}

function printBanner() {
    console.log("****************");
    console.log("**** 고객채무 ****");
    console.log("****************");
}