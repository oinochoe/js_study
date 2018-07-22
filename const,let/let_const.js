//let,const(block-scoped)

//es2015 -- > es6 라고 하는 부분에서 추가된 변수이다

//javascript에 var 만 존재해서 아래와 같은 문제가 발생

// 이미 만들어진 변수이름으로 재선언했는데 아무런 문제가 발생하지 않는다.
var a = 'test';
var a = 'test2';
console.log(a);


//hoisiting으로 인해서 ReferenceError에러가 안난다. 나야만 하는데..
c='test'
var c
// 이게 말이 되냐?

//위와 같은 문제때문에 js는 욕받이를 했다.
// let, const를 사용해서 좀더 명확하게 이점을 가질 수 있다.
//두개의 공통점은 var와 다르게 변수 재선언 불가능이다.
//변수 재선언 불가능
//변수 재선언 불가능
//변수 재선언 불가능
//변수 재선언 불가능

//let과 const의 차이는 변수의 immutable 여부이다.
/*
Immutable이란..(JAVA)
Immutable이란 생성후 변경 불가한 객체입니다.
그래서 immutable에는 set 메쏘드가 없습니다. 
멤버 변수를 변경할 수 없습니다.
return type이 void인 메쏘드도 없습니다. 
주로 void 메쏘드는 뭔가를 하고(하지 않을 수도 있고.. ) 멤버변수를 변경하는 역할을 하는 것이기 때문에 쓸 일이 거의 없습니다.
(물론, 콘솔에 뭔가를 찍는 것과 같은 예외적인 void는 있을 수 있습니다.)
Immutable을 쓰면, 멀티 쓰레드 환경에서 좀 더 신뢰할 수 있는 코드를 만들어 내기가 쉽습니다.
멀티 쓰레드 프로그램을 짜보셨다면 아시겠지만, 멀테 쓰레드 환경에서는 에러보다 비정상적 작동의 경우가 많습니다.
에러도 아니기 때문에 찾아내기도 어렵습니다.
게다가 항상 생기는 것도 아니고 백번에 한번 천번에 한번 식으로 문제가 생겨 정말 머리 아픈 경우가 한 두번이 아닙니다.
Immutable을 쓰게 되면, 이런 요소들을 많이 줄일 수 있습니다.

*/
//let은 변수에 재할당이 가능하지만

//const는 변수 재선언, 재할당 모두 불가능이다.


// let

let b = 'test'
let b = 'test2' // Uncaught SyntaxError : Identifier 'b' has aleady been declared
b = 'test3'; // 가능


//const
const d = 'test'
const d = 'test2' // Uncaught SyntaxError : Identifier 'd' has aleady been 
d = 'test3' //가능(?) -- > No 안된다. const 는 안되  Uncaurght TypeError : Assignment to constant variable

//let, const가 호이스팅이 발생하지 않는것은 아니다 절대 아니다.
//var 가 function-scoped로 hoisiting이 되었다면
// let,const는 block-scoped로 hoisiting이 발생

f = 'test' //ReferenceError : f is not defined
let f

//위의 코드에서 보듯이.. tdz가 발생하기 때문이다

//tdz(temporal dead zone)
//let은 값을 할당하기전에 변수가 선언 되어있어야 하는데 그렇지 않기 때문에 에러가 난다.

//이건 const도 마찬가지인데 좀 더 엄격하다.

//let은 선언하고 나중에 값을 할당이 가능하지만.
let dd
dd = 'test'

//const는 선언과 동시에 값을 할당해야한다.
const aa // Missing initializer in const declaration

//이렇게 js 에 tdz가 필요한 이유는 동적언어이다 보니까 runtime type check 가 필요해서이다.


//end
 //dfs
//
