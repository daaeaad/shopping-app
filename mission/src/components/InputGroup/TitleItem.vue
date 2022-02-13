<template>
  <div class="line hori bold"></div>
  <div class="title_sec align_left">
    <p class="txt size_16 weight_eb">
      {{ title }}
    </p>
    <p v-if="subTitle" class="txt size_14 color_98">
      {{ subTitle }}
    </p>
  </div>
  <div class="line hori"></div>
</template>

<script>
export default {
  name: 'TitleItem',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped></style>
