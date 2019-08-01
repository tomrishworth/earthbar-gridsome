<template>
  <div class="position-relative">
    <app-header></app-header>
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/AppHeader.vue";

export default {
  components: {
    AppHeader
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/style.scss";
</style>




