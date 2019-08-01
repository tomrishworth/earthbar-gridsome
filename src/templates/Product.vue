<template>
  <Layout :title="$page.product.title">
    <h1>{{$page.product.title}}</h1>
  </Layout>
</template>

<script>
import Layout from "~/layouts/Default.vue";

export default {
  components: {
    Layout
  },
  metaInfo() {
    return {
      title: this.$page.product.title
    };
  }
};
</script>


<page-query>
query Product ($id: String!) {
  product: product (id: $id) {
    title
  }
}
</page-query>