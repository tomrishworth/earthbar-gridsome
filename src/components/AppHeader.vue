<template>
  <header>
    <b-navbar fixed="top" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
        <g-link to="/">{{ $static.metaData.siteName }}</g-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <g-link class="nav-link" to="/">Home</g-link>
          <g-link class="nav-link" to="/about">About</g-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
      </b-collapse>
      <div class="ml-auto">
        <b-btn id="addToCartBtn" @click="openCart" class="btn">
          <g-image width="20" src="~/assets/images/shopping-cart-icon.svg" />
          <span
            class="badge badge-pill"
            v-if="Object.getOwnPropertyNames(checkout).length !== 0"
          >{{ numberOfItemsInCart}}</span>
        </b-btn>
        <b-popover
          v-if="lastItemAddedToCart"
          :show.sync="showPopover"
          placement="bottomLeft"
          target="addToCartBtn"
        >
          <div class="d-flex mb-2">
            <div class="mr-2">
              <img width="80" :src="lastItemAddedToCart.variant.image.src" />
            </div>
            <div>
              <strong>{{lastItemAddedToCart.title}}</strong> added to your cart.
            </div>
            <div>
              <b-btn variant="link" @click="hidePopover">&times;</b-btn>
            </div>
          </div>
          <div class="d-flex justify-content-center border-top pt-2">
            <b-btn @click="openCartFromPopover" class="mr-1" size="sm">View your cart</b-btn>
            <b-btn class="ml-1" size="sm" variant="primary">Proceed to checkout</b-btn>
          </div>
        </b-popover>
      </div>
    </b-navbar>

    <!-- <transition name="slideRight">
      <div v-if="showCart" class="cart">
        <Cart></Cart>
      </div>
    </transition>-->
    <!-- <b-button v-b-modal.cart-modal>Launch demo modal</b-button> -->
    <b-modal v-model="cartModalShow" hide-footer size="lg" id="cart-modal" title="Your Cart">
      <Cart></Cart>
    </b-modal>
  </header>
</template>

<script>
import Cart from "~/components/Cart";
export default {
  components: {
    Cart
  },
  methods: {
    openCart() {
      this.$store.dispatch("openCart");
    },
    openCartFromPopover() {
      this.$store.dispatch("hidePopover");
      this.$store.dispatch("openCart");
    },
    hidePopover() {
      this.$store.dispatch("hidePopover");
    }
  },
  computed: {
    numberOfItemsInCart() {
      if (Object.getOwnPropertyNames(this.checkout).length !== 0) {
        console.log("true");
        return this.checkout.lineItems.reduce((sum, item) => {
          return sum + item.quantity;
        }, 0);
      } else {
        return 0;
      }
      // return 0;
    },
    checkout() {
      return this.$store.state.checkout;
    },
    cartModalShow() {
      return this.$store.state.cartModalShow;
    },
    lastItemAddedToCart() {
      return this.checkout.lineItems.find(
        product => product.variant.id == this.$store.state.lastItemAddedToCart
      );
    },
    showPopover() {
      return this.$store.state.showPopover;
    }
  }
};
</script>


<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

