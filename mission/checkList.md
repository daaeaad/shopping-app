
# 1주차 미션

### 기능 구현 요구사항
- [X] 제공된 Boilerplate 코드를 개발 서버의 첫 페이지에서 로고와 “Welcome to Your Vue.js App”이라는 문구 밑에 문자열 입력란(이하 input)과 버튼이 있습니다.
- [X] input은 첫 로딩시 빈 문자열을 가지고 있으며, input에서 입력한 값은 실시간으로 반영되어 바로 밑에 표시가 되어야 합니다.
- [X] 버튼을 누르면 input에 입력된 문자열과 바로 밑에 표시되는 문자열이 왼쪽으로 1칸씩 회전합니다.
    - 예. Projectlion 라는 입력값이 있을 때 버튼 1회 클릭 → rojectlionP 로 변경
- [ ] (심화) 또 다른 버튼을 만들어, 이 버튼을 누르면 input에 입력된 문자열과 이 버튼을 누른 횟수를 보여주는 알림창을 띄워보세요.




## 220105

#### [ 프로젝트 생성 및 환경 세팅 ]
- jest 프레임워크 설치
- package.json : scripts에 jest 실행 추가
#### [ Components ]
- 텍스트 입력받을 컴포넌트, 입력된 내용을 보여줄 컴포넌트 각각 생성
    - components/TextInputItem.vue
        - 입력받은 텍스트를 부모 컴포넌트(Home.vue)로 전달
    - components/TextView.vue
        - 부모 컴포넌트(Home.vue)에서 text를 받아옴
        - 받아온 text, 글자섞기버튼, 알림버튼 렌더링
#### [ 기능 ]
- 글자 1칸씩 회전
    - componentes/TextView.vue
        - 글자섞기버튼 클릭시 부모컴포넌트(Home.vue)에서 보내준 shakeText 함수 실행
#### [ Style ]
- 추가 : assets/style/template.css
    - 기본으로 사용할 스타일



