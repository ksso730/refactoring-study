// 매개변수를 속성으로 바꾸기

// 고객이 뉴잉글랜드에 살고있는지 확인하는 코드
function inNewEngland(stateCode){
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

// 호출
const newEnglanders = someCustomers.filter (c => inNewEngland(c.address.state));
