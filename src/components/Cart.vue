<template>
  <div>
    <!-- <div>
      <button @click="handleClose">X</button>
    </div>
    <h2>Your Cart</h2>-->
    <div class="mb-2" v-for="item in checkout.lineItems" :key="item.id">
      <line-item :item="item"></line-item>
    </div>

    <div class="d-flex">
      <div class="ml-auto">
        <div class="text-right">
          Sub Total:
          <strong>${{ checkout.totalPrice}}</strong>
        </div>
        <div class="text-muted mb-2 text-right">Shipping is calcualted at checkout</div>
        <div class="text-right">
          <button @click="closeModal" class="btn btn-outline-primary mr-2">Continue Shopping</button>
          <a :href="checkout.webUrl" class="btn btn-primary">Proceed to Checkout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from "~/components/NumberStepper.vue";
import LineItem from "~/components/LineItem.vue";

export default {
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$store.dispatch("closeCart");
    }
  },
  components: {
    Stepper,
    LineItem
  },
  computed: {
    checkout() {
      return this.$store.state.checkout;
    }
  }
};
</script>

