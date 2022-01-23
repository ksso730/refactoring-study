# REFACTORING
> 리펙터링 2판 -마틴파울러 를 스터디.

### 아하⁉️
> - 반복문 쪼개기
    반복문이 쪼개져 있는 경우 오히려, 중복된 반복문을 없애기 바빴는데. 쪼개는 것이 리팩터링이었다.
    최적화 이전에 리펙터링이 먼저. 이후에 문제가 생길 경우 다시 하나의 반복문으로 수정하면 된다.

> 1. 반복문 쪼개기
2. 문장 슬라이드 하기: 변수 초기화 문장을 변수값 누적 코드 바로 앞으로 옮긴다.
3. 함수 추출하기
4. 변수 인라인하기: 임시변수를 제거하고 질의함수로 대체

---

### 참고

- json 파일에서 값 읽어오기.
```js
const require = createRequire(import.meta.url);
const invoicesData = require("./data/invoices.json");
const playData = require("./data/play.json");

const invoices = JSON.parse(JSON.stringify(invoicesData));
const plays = JSON.parse(JSON.stringify(playData));
```