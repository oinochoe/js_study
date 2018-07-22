// 서비스워커를 지원하는 브라우저인 경우
if ('serviceWorker' in navigator) {
    // 윈도우가 로딩되었을 때
    window.addEventListener('load', function () {
        // 서비스워커 (sw.js)를 등록한다.
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // 등록이 성공했다면 (즉 설치가 완료되었다면)
            console.log("등록이 완료되었습니다");
        }).catch(function (err) {
            // 등록이 실패했다면
            console.log("등록이 실패했습니다");
        })
    })
}


// CACHE 네임스페이스
const CACHE_NAME = "contact-app";

// CACHE할 파일목록
const cache_urls = [
    '/',
    '/index.html',
    '/styles/contact.css',
    '/scripts/contact.js'
]

self.addEventListener('install', function (event) {
    // 설치가 시작되면 동작한다.
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('캐시가 열렸습니다');
                return cache.addAll(cache_urls);
            })
    );
})

self.addEventListener('fetch', function (event) {
    // 'fetch' 이벤트가 발생하였을 때
    event.respondWith(
        // event.request와 일치하는 것을 찾는다
        caches.match(event.request)
            .then(function (response) {
                // 만약 일치하는 게 있다면 반환한다.
                if (response) {
                    return response;
                }
                // 일치하는 게 없다면 이벤트의 요청을 발송한다. (즉 페이지 로딩)
                return fetch(event.request);
            }
            )
    );
});