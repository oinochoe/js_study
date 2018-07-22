//var는 function-scope이기 때문에 for 문이 끝난 다음에 i를 호출하면 값이 출력이 잘된다.
// 이건 var 가 hoisting 되었기 때문이다.

for (var j = 0; j < 10; j++) {
    console.log('j',j);
}
console.log('after loop j is ' , j); // after loop j is 10


// 아래의 경우에는 에러가 발생한다
function counter() {
    for (var i = 0; i < 10; i++) {
        console.log('i', i);
    }
}
counter();
console.log('after loop i is', i); // ReferenceError : i is not is not defined


//IIFE 로 FUNCTION-SCOPED인거처럼 만들 수가 있다 (즉시실행)
//IIFE 사용하면
//k is not defined가 뜬다
(function(){
    //var 변수는 여기까지만! hoisting이 된다.
    for(var k =0; k<10; k++;){
        console.log('k', k);
    }
})();
console.log('after loop k is ' , k) // referenceError : k is not defined


//***************************** 웃긴 부분의 시작  */
//IIFE는 function-scoped인 거처럼 보이게 만들어주지만 결과가 같진 않다.

// 이 코드를 실행하면 에러 없이 after loop t is 10이 호출된다.
(function() {
    //'use strict'
    for(t=0; t<10; t++){
        console.log('t', t);
    }
})();
console.log('after loop t is', t); //after loop t is 10
// t가 hoisiting 되어서 global 변수가 되었다.

//IIFE 쓰는데 이렇게 hoisiting 된다면 무슨 소용인가? 함수 선언식이랑 다를바가 없다.
// 그래서 이런 hoisiting을 막기 위해 use strict를  쓴다.

//변수 때문에 너무 많은 일을 한다고 생각지 않는가?






