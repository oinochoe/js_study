# NHN ENT - JAVASCRIPT Guide

# 비동기 스크립트

* HTML 문서에서 외부 자바스크립트를 로드하면, 스크립트 파일이 모두
로드 되고 실행될 때까지 브라우저는 문서 파싱을 멈추고 기다린다.

```html
<!-- defer 속성 사용 예 -->
<script defer src="...">

<!-- async 속성 사용 예 -->
<script async src="...">
```

![HTML 문서 파싱 및 스크립트 로드와 실행 사이의 순서](https://cloud.githubusercontent.com/assets/11814228/7510615/2f3ad228-f4d9-11e4-9a87-214649476ac3.png)

* 그림에서 처럼 "defer"와 "async"를 이용하면 이런 지연을 해결할 수 있지만
* 브라우저 버전별로 지원하는 범위가 다르고 
* async의 경우 스크립트 실행 순서를 보장할 수 없어 각 모듈과 Dom의 의존성 관리에 특별히 주의해야 한다

# 디렉토리 구성
프로젝트가 커질수록 에플리케이션 복잡도와 함께 스크립트 파일을 관리하는 비용도 크게 증가한다.

* HTML, CSS, JS를 모두 별도로 분리하고 각각의 폴더로 관리

* 오픈 소스나 라이브러리 같은 외부 코드를 내부 개발 코드와 분리하고, 각각의 폴더에서 관리한다.
NPM 등 모듈관리 도구를 사용하면
node_modules 폴더에 자동으로 관리되므로 사용하는 것을 권장

* 내부 개발 코드 중 생산성 향상을 위해 종속적 코드와 재사용 가능한 공용 코드를 따로 분리

* 모듈의 성격에 따라 적절히 네임 스페이스를 사용, 하나의 모듈을 하나의 파일로 구성

하나의 모듈은 하나의 파일로 압축이 되어 서비스에 배포된다. 때문에 파일의 개수보다는 파일을 구성하는 단위가 중요하다.
하나의 모듈은 하나의 파일로 구성한다.
모듈 명은 네임스페이스를 사용하여
종속 관계와 성격을 유추할 수 있도록 한다.

```javascript
// 트리 컴포넌트
ne.ticketlink.component.tree = ne.util.defineClass({
    init : function(){
        ...
    },
    ...
});
```
```
[트리 컴포넌트의 폴더 구조]
ticketlink
    ㄴ ...
        ㄴ js
            ㄴ component
                ㄴ tree.js
```
```javascript
// 서비스 코드 - 좌석 선택 / 해제를 화면에 그려주는 브러시 모듈
ne.ticketlink.view.brush.selectSeat = ne.util.defineClass({
    init : function(){
    ...  
    },
});
```
```
[브러시 모듈의 폴더 구조]
ticketlink
    ㄴ...
        ㄴJS
            ㄴ VIEW
                ㄴ BRUSH
                    ㄴ selectSeat.js
```

# 컨벤션
* 절대 space와 tab을 섞어쓰지말고 왠만해서는 space 4를 쓰도록 한다

* 변수 선언 및 할당은 항상 하나의 키워드와 함께 선언해야한다.


```javascript
//Good  - 변수별 선언
let foo = '';
let bar = '';
let quux = '';
```
```js
//bad - 한번만 선언
let foo = '',
    bar = '',
    quxx = '';
```

* 스코프의 시작지점에 변수를 선언한다

```js
//Good
function foo(){
    let bar = '';
    let quxx = '';
    ...
}

//bad - 스코프의 시작 지점이 아닌 곳에 변수 선언
function foo(){
    ...

    let bar = '';
}
```

* 선언과 할당 분리 예외
* 선언문과 사용시점이 크게 떨어져 가독성이 낮아지는 경우, 분리한다. 할당은 사용시점에 수행할 것. 스코프 시작점에서 수행할 것.

```js
// Good - 선언문과 할당을 분리
function foo(){
    let i, j, len, len2, item;

    i = 0;
    len this._array.length;
    for (; i < len; i+=1) {
        item = this._array[i];
    }

    //선언은 진입부에서 하고, 할당은 사용시점
    j = 0;
    len2 = this._array2.length;
    for(; j < len2; j+=1){
        item = this._array2[j];
        ...
    }
}

//bad
function foo(){
    let i = 0;
    let len = this._array.length;

    for(; i < len; i+=1){
        ...
    }

    //statement 내에서의 변수 사용 제한
    for (var j = 0, len2 = this._array2.length; j < len2; j += 1) {
        //statement 내에서의 변수 사용 제한
        var item = this._array2[j];
        ...

    }
}
```
* 선언만 하는 변수는 한줄로 연결하면 된다.
```js
// good(1) - 선언만 하는 변수
var foo, bar, quxx;

//good(2)
var foo;
var bar;
var quxx;

//bad - 개행
var foo,
    bar,
    quxx
```

* 선언과 동시에 할당을 하는 변수 먼저 그룹화

```js
// Good
var i = 0;
var j = 0;
var len = this._array.length;
var len2 = this._array2.length;
var foo, bar, quux, item;

// Bad - 그룹화 없음
var foo;
var bar;
var qux;
var i = 0;
var j = 0;
var len = this._array.length;
var len2 = this._array2.length;
var item;

// Bad -
var i = 0, length = ary.length, j, k;
```

* callback 등 익명 함수를 사용하는 경우

```js
// Good
function foo() {
    ...

    // 익명 함수의 스코프 안에서 변수 선언
    forEach(ary, function(data1, data2) {
        var resultData1 = calcData(data1);
        var resultData2 = calcData(data2);
    ...
    });
}

// Allow
function foo() {
    var length = ary.length;
    var i = 0;
        ...

    forEach(ary, function(data1, data2) {
        var resultData1 = calcData(data1);
        var resultData2 = calcData(data2);
        ...

        // 필요에 따라 외부에 변수 선언 가능 (클로저 사용 허용)
        i += (length + 2);
        ...
    });
}

// Bad
function foo() {
    var resultData1, resultData2;
    ...

    // 불필요한 클로저 사용
    forEach(ary, function(data1, data2) {
        resultData1 = calcData(data1);
        resultData2 = calcData(data2);
        ...
    });
}
```

* es6 에서의 변수 선언 및 할당

```js
// good
const foo = '';
const bar = '';
let quxx = '';

//bad
var foo = '';

//bad
const foo = '';
let quxx = '';
const bar = '';

```

* 블록 스코프 안에서 선언, 사용시점에 선언 및 할당

```js
//good 
function foo(){
    const len = this._array.length;
    for(let i = 0; i < len; i += 1){
        ...
    }
    //사용시점에서 선언 및 할당
    const len2 = this._array2.length;
    for(let j = 0; j < len2; j += 1){
        const item = this._array2[j];
    }
}

//bad - 블록스코프 밖에서 선언
function foo(){
    const len = this._array.length;
    //블록스코프 밖에서 선언했다.
    let i = 0;
    let j = 0;
    let len2, item;

    for (; i < len; i += 1) {
        ...
    }

    //사용시점에 선언안했고 할당만 했다.
    len2 = this._array2.length;
    for (j=0, len2 = this._array2.length; j < len2; j+=1)) {
        item = this._array2[j];
        ...
    }
}
```

* const 먼저 그룹화

```js
//good
const len = this._array.length;
const len2 = this._array2.length;
let i = 0;
let j = 0;
let foo, bar;

```
* 배열과 객체는 반드시 리터럴
* 배열 복사 시 순환문 사용 노노

```js
//good
var emptyArr = [];
var arr = [1,2,3,4,5];

//bad
var emptyArr = new Array();
var arr = new Array(1,2,3,4,5);
```
* 배열의 복사
  - es5 - array.prototype.slice를 사용
  * es6 - 전개 연산자를 사용

```js
var len = item.length;
var itemCopy = [];
var i;

//bad
for (i = 0; i < len; i++) {
    itemCopy[i] = items[i];
}

//Good(1)
itemsCopy = items.slice();

//Good(2)
const itemsCopy = [...items];
// ... <- 전개 연산자

```

* 객체
```js
//good
var emptyObj = {};
var obj = {
    pro1:'val1',
    pro2:'val2'
};

//bad -  객체 생성자 사용
var emptyObj = new Object();
var obj = new Object();

// 추가 : 객체 프로퍼티가 1개인 경우에만 한줄 정의를 허용
//good
var obj = {foo : 'a'};

//good
var obj = {
    foo : 'a'
};

//bad - 개행 없음 (2개이상일 때)
//bad - 콜론 이전에 공백
var obj = {
    foo : 'a'
}
// foo 와 : 사이에 공백.. ㅡㅡ

//bad - 프로퍼티 값에 따옴표 사용 , 마지막 프로퍼티 콤마
var obj = {
    'foo': 'a',
    'bar': 'b',
}
```

* method syntax 사용 [es6]

```js
//good
const atom = {
    value : 1,

    addValue(value){
        return atom.value + value;
    }
};

//bad
const atom = {
    value : 1,
    
    addValue : function(value){
        return atom.value + value;
    }
}
```

* 호이스팅 발생하는 함수 생성자  금지

```js
//good(1)
function doSomething(param1, param2){
    return param1 + param2;
}

//good(2)
var doSomething = function(param1, param2){
    return param1 + param2;
};

//good(3) - 이름있는 함수 표현식
var doSomething = function doSomething(param1, param2){
    return param1 + param2;
};

//good(4) - IIEF
(function(){
    ...
})();

//bad(1) - 함수 생성자
var doSomething = new Function('param1', 'param2', 'return param1 + param2');

//bad(2) - IIEF
(function(){

}()); // 여기서는 괄호가 좀 틀려.


```

* 화살표 함수 es6
* 함수 표현식 대신에 화살표 함수 사용

```js
//good
[1,2,3].map(x => {
    const y = x + 1;
    return x * y;
});
// 결과 - > (3)[2,6,12]

//bad
[1,2,3].map(function(x){
    const y = x + 1;
    return x * y;
});
//결과는 같지만 화살표 함수 권장이다.


```

* 함수의 본체가 하나의 식이면 중괄호를 생략하고 암시적 return을 이용할 수 있다.
그외에는 return문을 명시해야함

```js
// good
[1, 2, 3].map(number => {
    const nextNumber = number + 1;
    return `A string containing the ${nextNumber}.`;
});

//good
[1, 2, 3].map(number => `A string containing the ${number}.`)

//bad - 2줄 이상인데 return 문 없음
[1, 2, 3].map(number => {
    const nextNumber = number + 1;
    `A string containng the ${nextNumber};`;
});
```

* 함수의 인수가 하나인 경우 소괄호를 생략할 수 있따.

```js
//good
[1, 2, 3].map(x => x * x);

//good
[1, 2, 3].reduce((y, x) => x + y);


```

# Destructuring ES6

* 하나의 오브젝트에서 복수의 프로퍼티에 접근할 때는 Destructuring을 이용.

```js
//good
function getFullName(obj){
    const {firstName, lastName} = obj;

    return `${firstName} ${lastName}`;
}

//BEST
function getFullName({firstName, lastName}){
    return `${firstName} ${lastName}`;
}

//bad
function getFullName(user){
    const firstName = user.firstName;
    const lastName = user.lastName;

    return `${firstName} ${lastName}`;
    //destructuring을 사용하지 않은 것
}
```

* 배열도 Destructuring이 가능하다.
```js
const arr = [1, 2, 3, 4];

//good
const [first, second] = arr;

//bad
const first = arr[0];
const second = arr[1];
```

# 템플릿 문자열 es6

* 프로그램에서 문자열을 생성하는 경우 template string를 이용한다.
```js
//good
function sayHi(name) {
    return `How are you, ${name}?`;
}

//bad
function sayHi(name) {
    return 'How are you, ' + name + '?';
}

//bad
function sayHi(name) {
    return ['How are you, ', name, '?'].join();
}
```

#클래스와 생성자 ES6

* class와 extends를 이용해서 객체 생성 및 상속 구현
* mixin 제외, 명시적으로 prototype 호출 않는다.

```js
//good
class Queue {
    constructor(contents = []) {
        this._queue = [...contents];
    }
    pop() {
        const {value} = this._queue;
        this._queue.splice(0, 1);
        return value;
    }
}

//bad
function Queue(contents = []){
    this._queue = [...contents];
}
Queue.prototype.pop = function(){
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
};

//Good
class PeekableQueue extends Queue{
    peek() {
        return this._queue[0];
    }
}

//bad
const inherits = require('inherits');
function PeekableQueue(contents){
    Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
    return this._queue[0];
};

```
* 모듈 ES6

항상 import와 export를 이용한다.
이 때 wildcard import는 사용하지 않는다 또한 import 문으로 부터 직접 export 하지 않는다.

```js
//Good
import AirbnbStyleGuid from './AirbnbStyleGuid';
export default AirbnbStyleGuid.es6;

//Best
import {es6} from './AirbnbStyleGuid';
export default es6;

//Bad
const AirbnbStyleGuid = require('./AirbnbStyleGuid');
module.exports = AirbnbStyleGuid.es6;

//Bad
import * as AirbnbStyleGuid from './AirbnbStyleGuid';

//Bad
export {es6 as default} from './AirbnbStyleGuid';

```

* 블록 구문
    * 변수 선언 es5
es5 이하 버전에서는 자바스크립트는 함수 스코프만 허용
블록 스코프에서 변수나 함수 선언시 블록을 실행한 컨텍스트에 호이스팅
블록 스코프 안에서만 접근 가능하다는 오해 살 수 있으므로 블록 스코프에서는 변수나 함수 선언 금지.

```js
// Good
var i = 0;
var length = 10;
for(; i < length; i += 1)


//Good
var i;
var length;
for(i = 0, length = 10; i < length; i += 1)

//Bad
for(var i = 0, var length = 10; i < length; i += 1)
```

    * 변수 선언 es6
블록 스코프를 가지는 const나 let을 사용하여 변수를 선언한다. var 사용 x

함수 선언
if/for/while/try 등 블록스코프에서 함수를 선언하지 않는다.
브라우저 별로 다르게 해석하여 오류 발생할 가능성 있다.

```js
//Good
var someFunction;

if (condition) {
    someFunction = function() {
        ...
    }
} else {
    someFunction = function() {
        ...
    }
}

//Bad
if (condition) {
    function someFunction() {

    }
}else{
    function someFunction() {

    }
}

```

* 블럭의 줄바꿈
if/for/while/try 등 블럭 구문을 사용할 때에는 한줄로 빼곡히 사용하지 않는다.
키워드와 조건문 사이에 빈칸을 사용하고, 괄호로 블럭의 시작과 끝을 명확히 정의하고 줄 바꿈 하여 사용
한줄 블럭은 코드 구조를 애매하게 만든다.
당장은 라인 두 줄을 줄일 수 있겠지만 이후 오류 발생확률이 높은 잠재적 위험요소


```js
//bad
if(condition) doSomething();
else doAnthing();
```

* for는 es5(블록스코프 안에서 변수를 선언하지 않는다.), es6(const,let을 사용하여 선언) 가 각각 다르다


```js
// good(1) - es5
var length = 100;
var i;
for (i = 0; i < length; i += 1) {
    ...
}

// good(2) - es5
var i = 0;
var length = 100;
for(; i < length; i += 1){
    ...
}

// good(3) - es6
const length = 100;
for(let i = 0; i < length; i += 1){
    ...
}

//bad(2) - 키워드 사이 띄어쓰기 없음, {} 없음, 개행 없음
var i = 0;
for(; i<100; i+=1) someIterativeFn();


```

# for - in 구문은 익스플로러에서만 좀 빠르다.

* 하지만 for-in을 쓰는 경우에도 좋고 나쁨이 있다
```js
//good - es5
var prop;
for (prop in object) {
    ...
}

//better - for-in 문 안에서 hasOwnProperty 조건 검사 수행
//es5
var prop;
for (prop in object) {
    if (object.hasOwnProperty(prop)) {
        ...
    }
}

//es6
for (const prop in object) {
    if (object.hasOwnProperty(prop)) {
        ...
    }
}

```

* switch - case 문
    * 첫번째 case 문을 제외하고 case문 사용 이전에 개행한다.
    * 각 구문은 /* falls through */, break, return, throw 중 한개로 끝내야한다.
    * default 문이 없으면 // no default 표시를 해준다.

```js
// Good
swtich (value) {
    case 1:
        /* fall through */
    case 2:
        doSomething();
        break;
    case 3:
        return true;
    default:
        throw new Error('This shouldn\'t happen.');
}

// Good - no-default 주석
swtich (value) {
    case 1:
        /* falls through */
    case 2:
        doSomething();
        break;

    case 3:
        return true;

    // no default
}
```

* 데이터형 확인하기
```js
//문자열
typeof variable === 'string';

//code-snippet.js 사용시
tui.util.isString(variable)


//숫자
typeof variable === 'number';

//code-snippet.js 사용시
tui.util.isNumber(variable)


//불린
typeof variable === 'boolean';

//code-snippet.js 사용시
tui.util.isBoolean(variable)


//객체
typeof variable === 'object';

//code-snippet.js 사용시
tui.util.isObject(variable)


//배열
Array.isArray(arrayObject)

//code-snippet.js 사용 시
tui.util.isArray(variable)


//널(Null)
variable === null

//code-snippet.js 사용 시
tui.util.isNull(variable)


//미할당 Undefined
typeof variable === 'undefined'
variable === undefined

//code-snippet.js 사용 시
tui.util.isUndefined(variable)


// 엘리먼트 노드
element.nodeType === 1

//code-snippet.js 사용 시
tui.util.isHTMLNode(element)


```

* 조건 확인하기
    * 값이 있는가?
[문자열] : 빈 문자열이 아닌가?
```js
// good(1)
if (string) ...

// good(2) - code-snippet.js 사용 시
if (tui.util.isNotEmpty(string)) ...

//bad
if (string !== "") ...
```

[배열] : 순회할 요소가 있는가?
```js
// good(1)
if (array.length) ...

// good(2) - code-snippet.js 사용 시
if (tui.util.isNotEmpty(array)) ...

// Bad
if (array.length > 0) ...
```

[객체] : 순회할 속성이 있는가?
```js
// good - code-snippet.js 사용 시
if (tui.util.isNotEmpty(object)) ...
```


    * 값이 비어있는가?
[문자열] : 빈 문자열인가? 

```js
// good(1)
if (!string)...

// good(2) - code-snippet.js 사용 시
if (tui.util.isEmpty(string)) ...

//BAD
if (string === '') ...

```

[배열] : 빈 배열인가?

```js
// good(1)
if(!array.length) ...

// good(2) - code-snippet.js
if(tui.util.isEmpty(array)) 

//bad
if(array.length === 0)
```

[객체] : 빈 객체인가
```js
if (tui.util.isEmpty(object)) ...
```

* 할당된 값이 있는가?

```js
// good - code-snippet
if(tui.util.isExisty(variable)) ...

//bad 
if (variable === undefined) ...
if (typeof variable === 'undefined') ...
```

* 참조변수가 참(true)인가? 
```js
// good
if (variable)...

//bad
if(variable === true)
```

# 반환하기

* 특정 값을 반환해야 하는 경우, 함수의 맨 마지막에 한번만 return 한다. 단 예외 처리로 빠져나가기 위해 사용하는 return은 제외한다.

* 함수 내에서 if 문이 여러 번 호출되면, 함수로 분리해야 한다. 부득이한 경우에만 이 규칙을 적용한다

```js
// Good
function getResult() {
    var resultData;
    ...

    if(condition) {
        ...
        resultData = someDataIntrue;
    }else{
        ...
        resultData = someDataInFalse;
    }
    return resultData;
}

// Allow
function foo(isValid) {
    ...
    //예외처리로 빠져나감
    if (!isValid) {
        return;
    }
    ...
    return someDataInTrue
}

//bad
function getResult() {
    ...
    if(condition) {
        ...
        return someDataInTrue;
    }
    ...
    return someDataInFalse;
}
```

* 순회하기

[배열]
```js

// Good
var i, len
for (i = 0, len = array.length; i < len; i += 1) ...

// Better(1)
var i = 0;
var len = array.length;
for (; i < len; i += 1) ...

// Better(2) - code-snippet.js
tui.util.forEachArray(array, function(value, index) {
    ...
});

// Better(3) - code-snippet.js
tui.util.forEach(array, function(value, index) {
    ...
});

// Bad
for (var i = 0; i < array.length; i += 1) ...

// worse
for (var i in array) ...

```

[객체]

```js
// good(1)
var key;
for (key in object) ...

// good(2) - code.snippet.js
tui.util.forEach(object, function(value, key) {
    ...
});

```

# Callback function의 Scope

* 되도록이면 Closure의 사용을 피하고 각 스코프에 알맞게 변수 선언

```js
// bad
var data1, data2, ...;

forEach(arr, function() {
    data1 = someFunction1();
    data2 = someFunction2();
    ...
});

// good
forEach(arr, function() {
    var data1 = someFunction1();
    var data2 = someFunction2();
});

// case that allows closure
var someValue = 0;
var length = arr.length;
    ...

forEach(arr, function() {
    var data1 = someFunction1();
    var data2 = someFunction2();
    ...
    someValue += data1 + data2 - length;
});

```

# 주석

* 주석은 코드의 이해를 돕기 위한 보조문이다. 주석에는 한 줄 주석과 여러 줄 주석 두 가지가 있다.
* 주석은 설명하려는 구문에 맞춰 들여쓰기 한다. 문장의 끝에 주석을 작성할 경우, 한줄 주석을 사용하며 공백을 추가한다.[한줄 주석]

```js
// Good
var someValue += data1 + data2 - length; // 주석 표시 전 후 공백
```

* 여러줄 주석을 작성할때는 * 의 들여쓰기 맞춘다
   주석의 첫줄과 마지막줄은 비워둔다

```js
// Good
/*
 * '*' 표시의 정렬을 맞춘다.
 *
 */

 // BAD
 /*
 * '*' 표시의 정렬이 맞지않는다.
 */
```

* [코드블럭 주석 처리] 한 줄 주석을 사용한다

```js

// Good - 한 줄 주석 사용
...
// var foo = '';
// var bar = '';
// var quux;

// Bad - 여러 줄 주석을 사용
...
/*
 * var foo = '';
 * var bar = '';
 * var quxx;
 */


```

* 공백

키워드, 연산자와 다른 코드 사이에 공백이 있어야 한다.

```js
// Good
var value;
    if (typeof str === 'string') {
    value = (a + b);
}

//Bad
var value;
if (typeof str==='string') {
    value=(a+b);
}
```

* 괄호 바로 안에는 공백을 제거한다. 콤마 다음에 값이 올 경우 공백이 있어야 한다.

```js
// Good
var arr = [1, 2, 3, 4];

// Good
someFunction(a, b, {
    prop1: 1,
    prop2: 2,
    prop3: 3
});

///Bad - 괄호 안에 공백
if ( typeof str === 'string' )


//Bad - 괄호 안 공백, 콤마 뒤 공백 없음
var arr = [ 1,2,3,4 ]

//Bad - 객체의 닫는 괄호 다음에 개행
someFunction(a, b, {
        prop1: 1,
        prop2: 2,
        prop3: 3
    }
);

```

* 파일의 끝에서 한줄 띄어쓴다.

# 절대 안 됨
* 원시 래퍼 생성자 절대 사용 금지
* eval() 절대 사용 금지
* with문을 절대 사용하지 않는다.
