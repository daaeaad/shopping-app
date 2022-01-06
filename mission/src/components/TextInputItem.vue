<template>
<div class="input_frame">
    <input type="text"
        class="input_basic align_center"
        autocomplete="off" autofocus
        placeholder="문자를 입력 해보세요."
        v-model="text"
        @input="handleInput"
        :class="!isText ? 'focus' : ''"
    />
    <span class="txt description_warn">위 입력란을 먼저 작성해주세요.</span>
</div>
<div class="blank_box_15"></div>
</template>

<script>
export default {
  name: 'HomeInputItem',
  data() {
    return {
      text: '',
    };
  },
  props: {
    isText: { type: Boolean },
  },
  emits: {
    updateText: { type: Function },
  },
  methods: {
    handleInput() {
      // console.log('handleInput ::::: ');
      const { text } = this;
      this.$emit('updateText', text);
    },
  },
};
</script>

<style scoped>
input.input_basic {
  transition: 0.4s;
}
input.input_basic + .description_warn {display: none;
  font-size: 16px;
  padding: 10px;
  color: #ff5f5f;
}
input.input_basic.focus {
  border:1px solid #ff5f5f;
  /* animation: focus_input 0.4s; */
}
input.input_basic.focus + .description_warn {display: block;}
@keyframes focus_input {
  0% {
    transform: translateX(0px);
  } 25% {
    transform: translateX(-6px);
  } 50% {
    transform: translateX(0px);
  } 75% {
    transform: translateX(6px);
  } 100% {
    transform: translateX(0px);
  }
}
</style>
