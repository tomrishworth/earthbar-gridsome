<template>
  <div v-if="item" class="row border-bottom pb-2 mb-2">
    <div class="col-sm-6 d-flex">
      <div class="mr-2">
        <img width="60" :src="item.variant.image.src" />
      </div>
      <div>
        <div class="font-weight-bold">{{item.title}}</div>
        <div>
          {{item.variant.price | currency}}
          <button
            class="btn btn-outline-secondary btn-sm"
            @click="removeFromCart(item.id)"
          >Remove</button>
        </div>
      </div>
    </div>
    <div class="col-sm-2 d-flex align-items-center">
      <div>
        <button
          :disabled="lineItemStatus"
          @click="decreaseQuantity"
          class="btn btn-outline-secondary"
        >-</button>
      </div>

      <!-- <input
        type="number"
        v-bind:value="item.quantity"
        v-on:input="handleInputChange($event.target.value)"
      />-->
      <div style="width: 50px;" class="px-3" v-if="!lineItemStatus">{{ item.quantity }}</div>
      <div class="text-center" style="width: 50px;" v-else>
        <div class="spinner-border spinner-border-sm" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div>
        <button
          :disabled="lineItemStatus"
          @click="increaseQuantity"
          class="btn btn-outline-secondary"
        >+</button>
      </div>
    </div>
    <div class="ml-auto col-sm-2 text-right">
      <div>{{ lineItemTotal | currency }}</div>
    </div>
  </div>
</template>

<script>
import { parse } from "path";
import accounting from "accounting";

export default {
  props: ["item"],
  data() {
    return {
      newQuantity: null,
      loading: false
    };
  },
  filters: {
    currency: function(value) {
      return accounting.formatMoney(value);
    }
  },
  methods: {
    removeFromCart(value) {
      this.$store.dispatch("removeLineItemInCart", value);
    },
    // handleInputChange(value) {
    //   console.log(value);
    //   // this.tempQuantity = +value;
    //   // this.updateLineItemQuantity(this.item.id, value);
    // },
    increaseQuantity() {
      const newQuantity = this.item.quantity + 1;
      // console.log(newQuantity);
      this.updateLineItemQuantity(this.item.id, newQuantity);
    },
    decreaseQuantity() {
      const newQuantity = this.item.quantity - 1;
      console.log(newQuantity);
      this.updateLineItemQuantity(this.item.id, newQuantity);
    },
    updateLineItemQuantity(id, quantity) {
      // console.log(id);
      // console.log(quantity);
      quantity = parseInt(quantity);
      const lineItemsToUpdate = [{ id: id, quantity: quantity }];
      this.$store.dispatch("updateLineItemInCart", lineItemsToUpdate);
    }
  },
  computed: {
    lineItemStatus() {
      return this.$store.state.loadingLineItems[this.item.id];
    },
    lineItemTotal() {
      return this.item.quantity * this.item.variant.price;
    }
  }
};
</script>

