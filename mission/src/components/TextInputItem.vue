<template>
<div class="input_frame">
    <input type="text"
        class="input_basic align_center"
        autocomplete="off" autofocus
        placeholder="문자를 입력 해보세요."
        v-model="text"
        @input="handleInput"
    />
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
  methods: {
    handleInput() {
      // console.log('handleInput ::::: ');

      const { text } = this;
      this.$emit('updateText', text);
    },
  },
};
</script>
