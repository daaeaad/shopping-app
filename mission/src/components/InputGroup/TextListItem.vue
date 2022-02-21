<template>
  <li class="lay_1 flex row align_center justify_space_between">
    <div class="left">
      <p class="txt size_12 color_98">
        {{ title }}
      </p>
    </div>
    <div class="right">
      <p :class="contentClass">
        {{ content }}
      </p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TextListItem',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const normalStyle = ['txt', 'size_14', 'weight_m'];
    const importantStyle = ['txt', 'size_16', 'weight_b', 'color_red'];

    const contentClass = !props.isImportant ? normalStyle : importantStyle;

    return { contentClass };
  },
};
</script>

<style scoped></style>
