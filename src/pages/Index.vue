<template>
  <Layout>
    <div class="row">
      <div class="col-sm-4 mb-3" :key="product.id" v-for="product in $page.allProduct.edges">
        <div>
          <img width="100" class="img-fluid" :src="product.node.images[0].src" />
        </div>
        <div>{{ product.node.title }}</div>
        <div>
          <g-link :to="product.node.path">Read more</g-link>
        </div>
        <div>
          <button
            @click="addToCart(product.node.variants[0].id)"
            class="btn btn-sm btn-outline-primary"
          >Add to Cart</button>
        </div>
      </div>
    </div>
    <!-- <b-button @click="makeToast()">Show Toast</b-button> -->
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Hello, world!"
  },
  methods: {
    makeToast() {
      this.$bvToast.toast(`Added to cart`, {
        title: "Added",
        variant: "success",
        autoHideDelay: 5000
      });
    },
    addToCart(value) {
      const itemToAdd = [
        {
          variantId: value,
          quantity: 1
        }
      ];
      this.$store.dispatch("addVariantToCart", itemToAdd);
    }
  },
  computed: {
    numberOfItemsInCart() {
      // if (Object.getOwnPropertyNames(this.checkout).length !== 0) {
      //   console.log("true");
      //   return this.checkout.lineItems.reduce((sum, item) => {
      //     return sum + item.quantity;
      //   }, 0);
      // } else {
      //   return 0;
      // }
      return 0;
    },
    checkout() {
      return this.$store.state.checkout;
    }
  },
  mounted() {
    this.$store.dispatch("getCheckoutId").then(() => {
      this.$store.dispatch("getCart");
    });
    // this.$store.dispatch("getCheckoutId");
  }
};
</script>

<style>
.cart {
  width: 500px;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background-color: #f6f6f6;
  padding: 20px;
  border-right: 1px solid #ddd;
}
</style>

<page-query>
query Products {
  allProduct {
    edges {
      node {
        id  
        title
        description
        path
        images {
          id
          src
        }
        variants {
          id
          price
          available
          compareAtPrice
        }
      }
    }
  }
}
</page-query>