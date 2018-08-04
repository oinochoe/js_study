# NHN ENT - JAVASCRIPT Guide

[본문]
* https://github.com/nhnent/fe.javascript/wiki/%EC%95%88%ED%8B%B0-%ED%8C%A8%ED%84%B4#script%EB%8A%94-%EB%AC%B8%EC%84%9C-%ED%95%98%EB%8B%A8%EC%97%90%EC%84%9C-include-%ED%95%98%EB%9D%BC


* 변수 선언시 반드시 var 키워드 또는 hoist 방지를 위해 let, const를 사용하라.

* 배열과 객체는 리터럴로 선언한다.

```javascript
[bad]
var emtpyArr = new Array();
var emptyObj = new Object();

var arr = new Array(1, 2, 3, 4, 5);
var obj = new Object();

[good]
let emptyArr=[];
let emptyObje = {};

const arr = [1,2,3,4,5];
let obj = {
    pro1 : 'value1',
    pro2 : 'value2'
}
```

* 변수와 함수는 사용하기 전에 선언하라.
- 호이스팅 비용 발생한다.

[Bad]
```javascript
doSomething();

function doSomething() {
    foo1 = foo2;
    ...
    var foo1 = 'value1';
    foo3 = foo4;
    ...
    var foo4 = 'value4';
    var foo2;
}
```


[Good]

```javascript

// 함수를 사용하기 전에 선언
function avoidHoisting() {
    // 함수내에서 사용하는 모든 변수를 함수 상단에서 한번에 선언
    var foo1 = 'value1';
    var foo4 = 'value4';
    var foo3 = foo4;
    var foo2;
    ...
}

avoidHoisting();

```

* "==" 대신 "===" 을 사용하라

자바스크립트는 두 값 비교 산술 전에 암묵적인 
강제 형 변환이 실행된다.

이형 데이터 간 비교가 필요하다면
명시적으로 강제 형변환 후 삼중 등호 연산자("===" 또는 "!==" 사용한다.)

[Bad]
```javascript
var today = new Date();
if (form.month.value == (today.getMonth() + 1) && form.day.value == today.getDate()) {
    // 생일인 경우
    ...
}else{
    // 생일이 아닌 경우
    ...
}
```

[Good]
```javascript
var month = parseInt(form.month.value, 10);
var date = parseInt(form.month.value, 10);

if (month === (today.getMonth() + 1) && date === today.getDate()) {
    // 생일인 경우
    ...
}else{
    // 생일이 아닌 경우
    ...
}
```

[Tip]
```javascript
// 스트링으로 변환하기
String(10) === '10';  //true
10 + '' === '10'; // true

// 숫자로 변환하기
parseInt('10', 10) === 10; //true
Number('10') === 10; // true
+'10' === 10;   // true

// 불린으로 변환하기
!!'foo';  // true
!!'';     // false
!!'0';    // true
!!'1';    // true
!!'-1';   // true
!!{};     // true
!!true;   // true

```

* 주로 형변환시 parseInt를 사용하지만
10 진수로 변경할 때는 Number로 속도 측면에서 이득을 보자.
* ParseInt 문자열을 정수로 바꿀 때 두번째 인자로 기수(진법)을 생략하지말자.
생략하면 브라우저가 임의로 한다.

```javascript
var month = parseInt('08'); //8 -- > bad
var month = parseInt('08', 10); //8 -- > good

[tip]
// 10진수 변환하는 경우라면 Number()를 사용하거나 + 연산자를 붙이는 것이 더 빠르다.
let month = Number('08'); //8
let day = +'09' // 9
```

* swtich break 막 생략 금지
```javascript
function getGroup(part) {
    var group;
    switch (part) {
        case 'A':
            // A, B, C는 같은 그룹으로 처리하기 위해 break 생략
        case 'B':
            // A, B, C는 같은 그룹으로 처리하기 위해 break 생략
        case 'C':
            group = 'RED';
            break;
        case 'D':
            // D, E는 같은 그룹으로 처리하기 위해 break 생략
        case 'E' :
            group = 'BLUE';
            break;
        case 'F':
            group = 'GREEN';
            break;
        // no default
    }
    return group;
}
```
* 다양한 환경을 지원해야 한다면 성능 고려 swtich 문을 사용 마라

if문은 원하는 조건이 나올 때까지 순차적으로 모든 비교문을 순회하면서 비교
swtich문은 jump-table을 사용하여 한번에 원하는 곳으로 이동

때문에

if문은 조건 문의 개수만큼 O(n)의 시간 복잡도를 갖게 되어 성능의 단점
swtich 문은 case 의 개수만큼 jump-tabled을 차지하므로 메모리 단점
* 저버전 ie에서는 성능에도 문제가 있음
* case의 조건이 정수형이 아닌 경우(문자열 또는 연산) 라면 jump-table을 쓸수 없어 성능에도 이득 없음

```javascript
swtich case 대신에

//모듈방식

var swtichModule = (function(){
    return{
      alpha: function(){
          
      },
      beta : function(){
          
      },
      _default : function() {
        ...
      }
    };
})();
```

* 배열의 순회는 for-in을 사용마라
* for-in은 프로토타입 체인에 있는 모든 프로퍼티를 순회한다. 
* for를 사용할때보다 보통 10배이상 느리고 index 순서대로 배열을 순회한다고
보장을 할 수 없다. 브라우저에 따라 다를 수 있다.

* 배열 순회시 array.length는 캐시해놓는게 좋다
성능이 2배 이상 증가

```javascript
[BAD]
const scores = [70, 75, 80, 61, 89, 56, 77, 83]
let total = 0;
let i = 0;

for (; i < scroes.length; i += 1){
    total += scores[i];
} 

[good]
const scores = [70, 75, 80, 61, 69, 50]
let total = 0;
let i = 0;
let len = scores.length;
for (; i < len; i += 1){
    total += scores[i];
} 
```

* 순회와 관련된 작업만 할 수 있도록 순환문을 최적화 한다.
리팩토링시 가장 먼저하는 작업.

[BAD]
```javascript
for (let i = 0; i < days.length; i += 1){
      const today = new Date().getDate();
      let element = getElement(i);
      if (today === days[i]){
          element.className = 'today';
      } 
  } 
```
[Good]
```javascript
const today = new Date().getDate();
let i = 0;
const len = days.length;
let element;

for(; i < len ; i += 1){
    if (today === days[i]){
        element = getElement(i);
        element.className = 'today';
        break;
    } 
}
```

* 자바스크립트의 아버지 더글라스 클락포드는 "리팩토링을 통해 continue를 제거했을때 성능이 향상되지 않은 경우를 본적이 없다"
고 말했다고 합니다. continue를 사용하면 js엔진에서 별도의 실행 컨텍스트를 만들어 관리하므로 
성능문제가 발생할 수 있다.

```javascript
[BAD]

let loopCount = 0;
let i = 1;
for (; i < 10; i += 1){
    if (i >= 5){
        continue;
    }
    loopCount += 1;
} 


[GOOD]

let loopCount = 0;
let i = 1;
for (; i < 10; i += 1){
    if(i < 5){
        loopCount += 1;
    }
} 
```

* try-catch는 순환문 안에서 사용하지마라
흔히 예외처리를 위해 try-catch를 사용하는데 catch문이 실행될 때 내부적으로
예외 객체를 변수에 할당하게 된다.
때문에 try-catch가 순환문 안에서 사용될 경우,
순회가 반복될 때마다 런타임의 현재 스코프에서 예외 객체 할당을 위한
새로운 변수가 생성된다.

* try-catch를 감싼 함수를 만들고, 순환문 내부에서 함수를 호출하라

[Bad]
```javascript
let i = 0;
let len = array.length;

for (; i < len; i){
    try {
      //..
    }catch (error) {
      //...
    }
}
```
[Good]
```javascript
let i = 0;
let len array.length;

function doSomthing(){
    try {
      ...
    }catch (e) {
      ...
    }
}

for (; i < len; i += i){
    doSomthing();
} 
```

* 배열의 요소를 삭제할 때 delete를 사용하지마라
그러면 undefined가 아니라 프로퍼티 자체가 완전히 삭제
따라서 배열의 요소를 삭제할 때는 splice 또는 length 사용

[Bad]
```javascript
const numbers = ['zero', 'one', 'two', 'three', 'four', 'five'];
delete numbers[2];  // ['zero', 'one', undefined, 'three' ...]
```
[Good]
```javascript
const numbers = ['zero', 'one', 'two', 'three', 'four', 'five'];
numbers.splice(2,1); // ['zero','one','three','four'...]
```


[Tip]
```javascript
const numbers = ['zero', 'one', 'two', 'three', 'four'];
numbers.length = 4; // ['zero','one','two','three']
```

* 두번 이상 사용되는 DOM 요소는 캐시를 활용하라
비단 DOM 요소에만 국한되는 내용은 아니지만 DOM 요소에 더 두드러지게 성능저하가 나타난다.
DOM과 같은 depth가 있는 트리 구조의 데이터는 dpeth가 깊어질 수록 해당 값까지 찾아가는데 많은 비용이 발생
* 탐색 비용을 절약위해 캐시사용

[Bad]
```javascript
const padding = document.getElementById('result').style;
const margin = document.getElementById('result').style.margin;
const position = document.getElementById('result').style.position;
```

[Good]
```javascript
const style = document.getElementById('result').style;
const padding = style.padding;
const margin = style.margin;
const position = style.position;
```

* 브라우저 랜더링 과정
```
Step1 HTML과 CSS를 파싱하여 DOM tree와 style 문맥 생성
Step2 DOM Tree와 Style 문맥 기반으로 엘리먼트 색상, 면적 등의 정보를 가진 Render Tree를 생성한다.
Step3 Redner Tree를 기반으로 각 노드가 화면의 정확한 비치에 표시되도록 배치
Step4 배치된 노드들의 visibility, outline, color등의 정보를 시각적으로 표현한다.
```
* Step3은 Reflow
* Step4를 Repaint
* DOM 조작시 reflow와 repaint가 내부적으로 반복 수행된다.
* 이 과정이 서비스 성능의 비용의 대부분을 차지한다.
* reflow와 repaint 최소화를 위해 몰아서 처리

[Bad]
```html
<div id="container">
    <div id="sample" style="position:absolute;background:red;width:150px;height:50px">
        SampleBox
    </div>
</div>
```
```javascript
function changeDivStyle() {
    const sampleEl = document.getElementById('sample');
    sampleEl.style.left = '200px'; //reflow 1회, repaint 1회
    sampleEl.style.width = '200px'; //reflow 1회, repaint 1회
    sampleEl.style.backgroundColor = 'blue'; //repaint 1회 발생
}
// 총 reflow 2회, repaint 3회 발생
changeDivStyle();
```
[Good]
```html
<div id="container">
    <div id="sample" style="position:absolute; background:red; width:150px; height:50px">
        SampleBox - good                    
    </div>
</div>
```
```js
//cloneNode 사용
function changeDivStyle() {
    const sampleEl = document.getElementById('sample');
    const clone = sampleEl.cloneNode(true);
    clone.style.left = '200px';
    clone.style.width = '200px';
    clone.style.backgroundColor = 'blue';
    document.getElementById('container').replaceChild(clone, sampleEl); // reflow 1회 repaint 1회 
    
}
changeDivStyle();
```

```js
//cssText를 사용하는 방법
function changeDivStyle(){
    const sampleEl = document.getElementById('sample');
    sampleEl.style.cssText = 'position:absolute; background:blue; width:200px; height:50px; left:200px'; // reflow 1회 repaint 1회
}
changeDivStyle();
```

* 실제 개발 과정에서는 위의 코드는 예시일뿐 addClass 등으로 className 수정방법으로 사용해야한다.



* eval은 사용하지 마라
* 프로그램 실행 중 파서가 새로 기동되어야 하는데 이는 상다한 부하를 만들어
프로그램 실행속도를 현저히 느리게 한다.

* settimeout, setInterval 시에 콜백함수 문자열 금지
```js
function callback(){
    
}
setTimeout('callback()', 1000); //bad

function callback(){
    ...
}
setTimeout(callback, 1000); //good
```

* 함수 생성자 new Function()는 사용하지마라
이 경우 문자열로 전달되는 파라미터가 수행 때 eval로 처리되어 실행속도가 느려진다.
* 함수 선언시 함수 선언식 또는 함수 표현식을 사용하라

[Bad]
```js
let doSomthing = new Function('param1', 'pram2', 'return param1 + pram2;');
```

[Good]
```js
//함수 선언식
function doSomething(param1, param2){
    return param1 + param2;
}
```
또는
```js
//함수 표현식
let doSomething = function(param1, param2){
    return param1 + param2;
}
```


* with()는 사용하지 마라
* 특정 객체를 반복적으로 접근할 때 간편함을 제공할 목적으로 만들어졌지만,
이런 의도와는 다르게 많은 문제점을 낳고 있어 사용하지 않는 것이 좋다

```js
function doSomething(value, obj){
    ...
    with(obj){
        value = "which scope is this?";
    }
    
}
//아래 코드 중 하나와 같게 된다.

value = "which scope is this ?"
obj.value = "which scope is this?"
```

어떤 코드로 실행될지 코드로만은 알 수 없다.
코드가 실행될 때마다 다르게 실행될 수도 있다.
with는 실행될때마다 추가적인 scope를 생성하여 추가적인 자원을 소모한다.
* 변수 탐색 최적화도 방해하여 실행속도를 현저히 느리게 한다.
* 그냥 캐싱을 사용하여 특정객체를 반복적으로 수행하는게 훨씬 낫다

[Bad]
```js
with(document.getElementById('myDiv').style){
    background = "yellow";
    color = "red";
    border = "1px solid black";
}
```

[Good]
```js
const dragon = document.getElementById('myDiv').style;
dragon.background = 'yellow';
dragon.color = 'red';
dragon.border = '1px solid black';
```

* 네이티브 객체는 절대 수정하지 말고 만약 필요한 메서드가 있다면
네이티브 객체의 prototype에 작성하는 대신 함수로 만들거나
새로운 객체를 만들고 네이티브와 상호작용하게 한다.

[Bad]
```js
Object.prototype.getKeys = function(){
    let keys = [];
    let key;
    for (key in this){
        keys.push(key); // for-in은 배열순회에 사용하지말라했다.
    } 
    return keys;
};
```

[Good]
```js
function getKeys(obj){
    let keys = [];
    let key;
    let len = obj.length;
    for (; key < len; key++){
        keys.push(key);
    } 
    return keys;
}
```
몽키패칭(monkey-patching)
: 네이티브 객체나 함수를 프로그램 실행 시 다른 객체나 함수로 확장하는
것을 몽키패칭이라고 한다.
자바스크립트를 포함한 일부 라이브러리나 프레임워크에서 이런 식의 확장을 사용하고는 있다.
캡슐화를 망친다.
이런 위험에도 불구하고, 신뢰성 있고 매우 중요한 몽키패칭의 특별한 한가지 
사용법이 있는데 바로 폴리필이다.
폴리필은 Array.prototype.map과 같이 자바스크립트 엔진에 새롭게
추가된 기능이 없는 경우, 비슷한 동작을 하는 다른 함수로 대체하는 것을 말한다.
폴리필과 같이 자바스크립트 기능의 호환성 유지 목적을 제외하고는
어떤 경우에도 네이티브 객체확장은 옳지 않다.

```js
if (typeof Array.prototype.map !== 'function'){
    Array.prototype.map = function(f, thisArg){
        let result = [];
        let i = 0;
        const n = this.length;
        for (; i < n; i += 1){
            result[i] = f.call(thisArg, this[i], i);
        } 
        return result;
    };
} 
```

* 단항 연산자를 사용하지 마라.
단항 연산자가 쓰인 연산의 결과를 한 눈에 파악하기 어렵다.
연산이 먼저인지, 값 할당이 먼저인지 고민해야 한다.
코드를 한줄 더 줄이는 것보다 읽기 쉬운 코드를 작성하는 것이 더 낫다.

[Bad]
```js
let i = 0;
let num;
for (; i < 10 ; i++){
    
} 
num = ( ++i ) * 10;
```

[Good]
```js
let i = 0;
let num;
for(; i < 10; i += 1){
    ...
}
i += 1;
num = 1 * 10;
```

* this에 대한 레퍼런스를 정의하지 마라

* 프로그래밍을 하다 보면 상위함수의 this에 대한 레퍼런스를 전달해야 할 때가 있다.
* 비슷한 이름의 레퍼런스 변수(that, self, me 등)을 만들고
내부함수의 클로저로 사용하면, 상위함수의 this를
내부 함수에 전달할 수 있다. 이는 개발자에게 혼란을 준다
그러니 this를 결정하는 명확한 함수인
Function.prototype.bind 함수나 화살표를 사용

[Bad]
```js
function(){
    var self = this;
    return function(){
        console.log(self);
    };
}
function(){
    var that = this;
    return function(){
        console.log(that)
    };
}
```

[Good]
```js
function printContext(){
    return function() {
      console.log(this);
    }.bind(this);
}

function printContext(){
    return () => console.log(this);
}
```

* var 보다는 let, const 사용할 것

* require, module.exports 보다는 import, export를 사용하라

* 모듈러가 보편화됨에 따라, ES6에서는 모듈 패턴을 지원하는 키워드인
import, export를 도입했다.
es6문법을 사용하기 위해서는 트랜스파일러가 필요하지만 import, export를 사용할 수 있는 환경이라면
require, module.exports 보다는 import,export를 사용하라.

[Bad]
```js
/* 
* Top of File
* */
const styleGuide = require('./styleGuide');
module.exports = styleGuide.es6;
```
[Good]
```js
/* top of file */
import styleGuide from './styleGuide';
export default styleGuide.es6;

/* top of file */
import { es6 } from './styleGuide';
export default es6;

```

* import문은 파일의 맨 위에 선언하라
* import문은 hoist 비용을 고려하여 코드의 맨 위로 작성한다
[Bad]
```js
import foo from 'foo';
foo.init();
import bar from 'bar';
```
[good]
```js
/* top of file*/
import foo from 'foo';
import bar from 'bar';
foo.init();

```

* 제너레이터를 사용할 때 * 의 위치에 주의하라 
제너레이터의 *의 위치가 바르지 않으면 트랜스파일링 되지 않는다.
가급적 사용하지 말자
꼭 사용해야한다면 *의 위치에 주의.
반드시 function 바로 뒤에 써야한다.

[Bad]
```js
function * foo(){
    ...
}
const bar = function * (){
    ...
}
function *foo(){
    
}

//very bad
function
*
foo(){
    ...
}

//very bad
const wat = function
*
(){
  ...  
};
```

[Good]
```js
funtion* foo()}{
    
}

const foo = function* (){
    ...
}
```