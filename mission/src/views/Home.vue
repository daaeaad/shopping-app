<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <div class="input_wrap">
      <TextInputItem @updateText="updateText" />
      <TextView :text="text" @shakeText="shakeText" />
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
    };
  },
  methods: {
    // text 변경
    updateText(text) {
      console.log('updateText ::::: ');

      this.text = text;
      console.log('this.text :: ', this.text);
    },
    // text 섞기
    shakeText() {
      console.log('shakeText ::::: ');

      let result = '';
      const { text } = this;
      console.log('original text :: ', text);

      // 1. text 배열화
      const textArr = text.split('');
      console.log('text array :: ', textArr);

      // 2. text배열의 가장 첫번째 요소 빼서 뒤로 push
      const textArrShift = textArr.shift();
      console.log('shifted array :: ', textArr);
      console.log('textArrShift :: ', textArrShift);

      textArr.push(textArrShift);
      console.log('pushed array :: ', textArr);

      // 3. 변경된 배열 문자열로 다시 바꾸기
      result = textArr.join('');
      console.log('result :: ', result);

      // 4. 섞은 문자열 data text에 업데이트
      this.text = result;
    },
  },
};
</script>

<style>
  .input_wrap {width: 100%; height: auto; padding: 30px;}
</style>
