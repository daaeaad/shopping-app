<template>
  <div class="ck_box rdo_btn">
    <label class="size_14 weight_m">
      <input type="radio" v-model="inputValue" id="" :value="detailValue" />
      <div class="box">{{ content }}</div>
    </label>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'RadioButton',
  components: {},
  props: {
    content: {
      type: String,
      default: '',
    },
    detailValue: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      inputValue,
    };
  },
};
</script>

<style scoped></style>
