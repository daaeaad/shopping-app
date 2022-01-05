<template>
<div class="txt_frame">
    <p class="txt">{{text}}</p>
</div>
<div class="blank_box_30"></div>
<div class="flex row justify_center">
    <button type="button" class="btn btn_basic btn_green"
    @click="handleShakeText">
      글자 섞기
    </button>
    <div class="blank_box_15"></div>
    <button type="button" class="btn btn_basic btn_gray"
    >
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
    },
  },
  methods: {
    handleShakeText() {
      console.log('handleShakeText ::::: ');

      this.$emit('shakeText');
    },
    handleClickBtn: () => {
      console.log(this);
    },
  },
};
</script>
