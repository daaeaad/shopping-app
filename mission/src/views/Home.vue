<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <div class="input_wrap">
      <!-- Input
      text 입력란 -->
      <TextInputItem @updateText="updateText" :isText="isText" :textModified="text" />
      <!--/ Input -->

      <!-- View
      입력한 text와 버튼 -->
      <TextView
        :text="text"
        :clickCnt="clickCnt"
        :isText="isText"
        @shakeText="shakeText"
        @countClick="countClick"
      />
      <!--/ View -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import '@/assets/style/template.css';
import HelloWorld from '@/components/HelloWorld.vue';
import TextInputItem from '@/components/TextInputItem.vue';
import TextView from '@/components/TextView.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    TextInputItem,
    TextView,
  },
  data() {
    return {
      text: '',
      clickCnt: 0,
      isText: false,
      isModalOpen: false,
    };
  },
  methods: {
    /* text 유효성 체크 */
    checkText(text = '') {
      // console.log('checkText ::::: ');

      // data의 text가 비어있고, input에 text가 입력됐을 경우
      let thisText = this.text;
      // data의 text가 비어있지 않은 경우
      if (text) {
        thisText = text;
      }

      // props의 text 데이터가 빈값이면, false
      // props의 text 데이터가 빈값이 아니면, true
      this.isText = !thisText ? Boolean(false) : Boolean(true);
      return this.isText;
    },

    /* text 변경 */
    updateText(text) {
      // console.log('updateText ::::: ');
      this.checkText(text);
      if (this.isText) {
        this.text = text;
      } else {
        this.text = '';
      }
    },

    /* text 섞기 */
    shakeText() {
      // console.log('shakeText ::::: ');
      this.checkText();
      if (this.isText) {
        let result = '';
        const { text } = this;

        // 1. text 배열화
        const textArr = text.split('');

        // 2. text배열의 가장 첫번째 요소 빼서 뒤로 push
        const textArrShift = textArr.shift();
        textArr.push(textArrShift);

        // 3. 변경된 배열 문자열로 다시 바꾸기
        result = textArr.join('');

        // 4. 섞은 문자열 data text에 업데이트
        this.text = result;
      }
    },

    /* 알림버튼 카운터 업데이트 */
    countClick(cnt) {
      this.checkText(); // 데이터 검증

      if (this.isText) {
        // 검증 결과 문제 없으면,
        this.clickCnt = cnt; // count 데이터 업데이트
        this.openAlert(); // 텍스트와 클릭횟수 alert
      }
    },
    /* alert */
    openAlert() {
      alert(`${this.text} \n 클릭한 횟수는 ${this.clickCnt}번 입니다.`);
    },
  },
};
</script>

<style>
.input_wrap {
  width: 100%;
  height: auto;
  padding: 30px;
}
</style>
