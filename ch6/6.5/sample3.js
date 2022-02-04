// 매개변수 추가하기
class Book {
    addReservation(customer){
        this.zz_addReservation(customer, false);
    }

    // 우선순위 큐에 넣을지 지정하는 매개변수 추가
    zz_addReservation(customer, isPriority){
        // isPriority 변수가 실제로 사용되는지 확인
        assert(isPriority === true || isPriority === false );
        this._reservations.push(customer);
    }
}