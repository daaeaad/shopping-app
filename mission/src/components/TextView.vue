<template>
<div class="txt_frame">
    <p class="txt">{{text}}</p>
</div>
<div class="blank_box_30"></div>
<div class="flex row justify_center">
    <button type="button" class="btn btn_basic btn_green"
    :disabled="!isText"
    @click="handleShakeText"
    data-testid="btnShakeText">
      글자 섞기
    </button>
    <div class="blank_box_15"></div>
    <button type="button" class="btn btn_basic btn_gray"
    :disabled="!isText"
    @click="handleClickBtn"
    data-testid="handleClickBtn">
      알림
    </button>
</div>
</template>

<script>
export default {
  name: 'TextInputItem',
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
    clickCnt: {
      type: Number,
      required: true,
      default: 0,
    },
    isText: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: {
    shakeText: {
      type: Function,
    },
    countClick: {
      type: Function,
    },
  },
  methods: {
    /* 버튼 클릭: 부모 컴포넌트의 shakeText 실행 */
    handleShakeText() {
      // console.log('handleShakeText ::::: ');
      this.$emit('shakeText');
    },
    /* 버튼 클릭: 부모 컴포넌트의 countClick 실행 */
    handleClickBtn() {
      // console.log('handleClickBtn ::::: ', this.clickCnt);
      let { clickCnt } = this;
      clickCnt += 1;
      this.$emit('countClick', clickCnt);
    },
  },

};
</script>
