// 오브젝트 foreach
for (const [key, value] of Object.entries(오브젝트)) {
    console.log();
}

// 오브젝트 값이 비어있는지 확인
Object.entries(오브젝트).length === 0

// 오브젝트 키값 변수 사용
var key = 'key';
var obj = {
    [key]: 'value'
};

// 배열에서 특정 값 삭제
arr = arr.filter(item => item !== value);

// 배열에서 특정 값 찾기
search = array.find(piece => piece.key === 'value');

// 폼 전송을 차단하고 해당 폼의 값을 콘솔에 출력하는 코드
const form = document.querySelector('#폼_아이디');
form.addEventListener('submit', (event) => {
    // 폼 전송을 중지합니다.
    event.preventDefault();
    console.log(new FormData(form));
});