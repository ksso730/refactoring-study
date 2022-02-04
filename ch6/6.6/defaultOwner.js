// ===============================================================================
// 1. 변수, 접근자를 같은 파일에 옮긴다.
// defaultOwner를 참조하는 코드는 getDefaultOwner를 사용하도록 캡슐화한다.
// defaultOwner를 갱신하는 코드는 setDefaultOwner를 사용하도록 캡슐화한다.
let defaultOwner = {firstName: "마틴", lastName: "파울러"};
export function defaultOwner() {return defaultOwner;}
export function setDefaultOwner(arg) {defaultOwner = arg;}

// ===============================================================================
// 2. 데이터 필드값 변경을 제어: 복제본을 반환하도록 한다.
//  - 리스트에 이 기법을 많이 적용
let defaultOwner = {firstName: "마틴", lastName: "파울러"};
export function defaultOwner() {return Object.assign({}, defaultOwner);}
export function setDefaultOwner(arg) {defaultOwner = arg;}

// ===============================================================================
// 3. 레코드 캡슐화 하기
let defaultOwner = {firstName: "마틴", lastName: "파울러"};
export function defaultOwner() {return new Person(defaultOwner);}
// export function setDefaultOwner(arg) {defaultOwner = arg;}
export function setDefaultOwner(arg) {
    defaultOwner.firstName = arg.firstName;
    defaultOwner.lastName = arg.lastName;
}

class Person {
    constructor (data){
        this._lastName = data.lastName;
        this._firstName = data.firstName;
    }

    get lastName() {return this._lastName;}
    get firstName() {return this._firstName;}
    set lastName(aLastName) {this._lastName = aLastName;}
    set firstName(aFirstName) {this._firstName = aFirstName;}
}

// ===============================================================================
