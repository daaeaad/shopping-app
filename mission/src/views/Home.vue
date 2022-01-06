<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <div class="input_wrap">
      <TextInputItem @updateText="updateText" :text="text" :isText="isText" />
      <TextView :text="text" :clickCnt="clickCnt"
      @shakeText="shakeText" @countClick="countClick" />
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
    };
  },
  methods: {
    /* text 유효성 체크 */
    checkText() {
      // console.log('checkText ::::: ');
      // props의 text 데이터가 빈값이면,
      this.isText = !this.text ? Boolean(false) : Boolean(true);
      return (this.isText);
    },

    /* text 변경 */
    updateText(text) {
      // console.log('updateText ::::: ');
      this.text = text;
      this.checkText();
      if (!this.isText) { this.text = ''; }
      // console.log('this.text :: ', this.text);
    },

    /* text 섞기 */
    shakeText() {
      // console.log('shakeText ::::: ');
      this.checkText();
      if (this.isText) {
        let result = '';
        const { text } = this;
        // console.log('original text :: ', text);

        // 1. text 배열화
        const textArr = text.split('');
        // console.log('text array :: ', textArr);

        // 2. text배열의 가장 첫번째 요소 빼서 뒤로 push
        const textArrShift = textArr.shift();
        // console.log('shifted array :: ', textArr);
        // console.log('textArrShift :: ', textArrShift);
        textArr.push(textArrShift);
        // console.log('pushed array :: ', textArr);

        // 3. 변경된 배열 문자열로 다시 바꾸기
        result = textArr.join('');
        // console.log('result :: ', result);

        // 4. 섞은 문자열 data text에 업데이트
        this.text = result;
      }
    },

    /* 알림버튼 카운터 업데이트 */
    countClick(cnt) {
      // console.log('countClick ::::: ', cnt);
      this.checkText();
      if (this.isText) {
        this.clickCnt = cnt;
        this.alertText(); // 텍스트와 클릭횟수 알림창
      }
    },
    /* 텍스트 알림창 */
    alertText() {
      // console.log('alertText ::::: ');
      alert(`${this.text} \n 알림 버튼 클릭 횟수는 ${this.clickCnt}번 입니다.`);
    },
  },
};
</script>

<style>
  .input_wrap {width: 100%; height: auto; padding: 30px;}
</style>
