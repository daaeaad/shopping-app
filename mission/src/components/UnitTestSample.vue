<template>
  <div class="sample">
    <h1>{{ msg }}</h1>
    <input type="text" name="names"/>
    <input type="text" name="names"/>
  </div>
</template>

<script>
export default {
  name: 'Sample',
  props: {
    msg: String,
  },
  methods: {
    sum(a, b) {
      return a + b;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
