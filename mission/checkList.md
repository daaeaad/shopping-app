
# 1주차 미션

### 기능 구현 요구사항
- [X] 제공된 Boilerplate 코드를 개발 서버의 첫 페이지에서 로고와 “Welcome to Your Vue.js App”이라는 문구 밑에 문자열 입력란(이하 input)과 버튼이 있습니다.
- [X] input은 첫 로딩시 빈 문자열을 가지고 있으며, input에서 입력한 값은 실시간으로 반영되어 바로 밑에 표시가 되어야 합니다.
- [X] 버튼을 누르면 input에 입력된 문자열과 바로 밑에 표시되는 문자열이 왼쪽으로 1칸씩 회전합니다.
    - 예. Projectlion 라는 입력값이 있을 때 버튼 1회 클릭 → rojectlionP 로 변경
- [X] (심화) 또 다른 버튼을 만들어, 이 버튼을 누르면 input에 입력된 문자열과 이 버튼을 누른 횟수를 보여주는 알림창을 띄워보세요.


## 220105

#### [ 프로젝트 생성 및 환경 세팅 ]
- jest 프레임워크 설치
- package.json : scripts에 jest를 실행하는 스크립트 추가
#### [ Components ]
- 텍스트 입력받을 컴포넌트, 입력된 내용을 보여줄 컴포넌트 각각 생성
    - components/TextInputItem.vue
        - 입력받은 텍스트를 부모 컴포넌트(Home.vue)로 전달
    - components/TextView.vue
        - 부모 컴포넌트(Home.vue)에서 text를 받아옴
        - 받아온 text, 글자섞기버튼, 알림버튼 렌더링
#### [ 기능 ]
- input에 글자 입력시 실시간으로 아래에 보여주기
- 글자 1칸씩 회전
    - componentes/TextView.vue
        - 글자섞기버튼 클릭시 부모컴포넌트(Home.vue)에서 보내준 shakeText 함수 실행
#### [ Style ]
- 추가 : assets/style/template.css
    - 기본으로 사용할 스타일


## 220106

#### [ 기능 ]
- text 데이터의 유효성 검증
- 알림 버튼 클릭시 클릭한 횟수 카운트
- 알림 버튼 클릭시 입력된 텍스트와 클릭 횟수를 알림창으로 보여주기
#### [ text 데이터의 유효성 검증 ]
- Home.vue 에 text 데이터의 유효성 검증 함수(checkText)와 데이터(isText(boolean)) 추가
- 모든 함수에 checkText 함수 실행을 요청하는 로직 추가
#### [ Style ]
- TextInputItem.vue에 input 포커싱 스타일 추가
    - isText가 false일때 .focus 클래스가 추가되면서 스타일이 적용됨.
#### [ 단위 테스트 ]
- Home.vue의 함수 단위테스트 진행 (/test/unit/home.spec.js)
