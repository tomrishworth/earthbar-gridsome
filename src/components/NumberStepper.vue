<template>
  <div>
    <button @click="decrease" class="btn btn-outline-secondary">-</button>
    {{number}}
    <!-- <input v-bind:value="number" v-on:input="up" /> -->
    <button @click="increase" class="btn btn-outline-secondary">+</button>
  </div>
</template>

<script>
export default {
  props: ["number"],
  methods: {
    decrease() {
      let newQuantity = this.number;
      newQuantity--;
      this.updateLineItemQuantity(newQuantity);
    },
    increase() {
      this.value++;
    },
    updateLineItemQuantity(value) {
      console.log(value);
      this.$store.dispatch("updateLineItemInCart", value);
    }
  }
};
</script>
