<template>
  <div data-test="myInfoView" id="myInfoView">
    <p data-test="userName">{{ username }}</p>
    <p data-test="userId">{{ id }}</p>
    <p data-test="userEmail">{{ email }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyInfoView',
  props: {
    id: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
  },
  setup() {},
};
</script>

<style scoped></style>
