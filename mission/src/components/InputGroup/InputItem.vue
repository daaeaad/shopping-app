<template>
  <li class="lay_1 flex row align_center">
    <div class="left">
      <p class="txt size_12">
        {{ inputTitle }}
      </p>
    </div>

    <div v-if="!isAddress" class="right flex grow_1">
      <input
        :type="inputType"
        class="lay_1 size_12 weight_m"
        :placeholder="inputTitle"
        v-model="inputValue"
      />
    </div>

    <div v-if="isAddress" class="right flex grow_1 col">
      <div class="lay_1 padding_bottom_10 flex row align_center">
        <input type="text" class="lay_1 size_12 weight_m" placeholder="" value="" />
        <div class="blank_box_10"></div>
        <button class="btn btn_input btn_square">우편번호 검색</button>
      </div>
      <div class="lay_1 padding_bottom_10">
        <input type="text" class="lay_1 size_12 weight_m" placeholder="" value="" />
      </div>
      <div class="lay_1 padding_bottom_10">
        <input type="text" class="lay_1 size_12 weight_m" placeholder="상세 주소" value="" />
      </div>
    </div>
  </li>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'InputItem',
  components: {},
  props: {
    inputTitle: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: String,
      default: '',
    },
    isAddress: {
      type: Boolean,
      default: false,
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
