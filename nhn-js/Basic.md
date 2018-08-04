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
