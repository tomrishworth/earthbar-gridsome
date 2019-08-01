import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const fetch = require('node-fetch');
const Client = require('shopify-buy');
const client = Client.buildClient(
  {
    domain: 'earthbar-nz.myshopify.com',
    storefrontAccessToken: '59bf389109a7d8016e30d82c934bc10b'
  },
  fetch
);

export default new Vuex.Store({
  state: {
    cartModalShow: false,
    showPopover: false,
    checkoutId: null,
    checkout: {},
    loadingLineItems: {},
    lastItemAddedToCart: null
  },
  mutations: {
    updateCheckoutId(state, id) {
      state.checkoutId = id;
    },
    updateCheckout(state, payload) {
      state.checkout = payload;
    },
    lineItemLoadingStatus(state, payload) {
      Vue.set(state.loadingLineItems, payload.id, payload.loading);
    },
    closeCart(state) {
      state.cartModalShow = false;
    },
    openCart(state) {
      state.cartModalShow = true;
    },
    showPopover(state) {
      state.showPopover = true;
    },
    hidePopover(state) {
      state.showPopover = false;
    },
    updateLastItemInCart(state, payload) {
      state.lastItemAddedToCart = payload;
    }
  },
  actions: {
    closeCart({ commit }) {
      commit('closeCart');
    },
    openCart({ commit }) {
      commit('openCart');
    },
    showPopover({ commit }) {
      commit('showPopover');
    },
    hidePopover({ commit }) {
      commit('hidePopover');
    },
    getCart({ commit, state }) {
      if (state.checkoutId) {
        client.checkout.fetch(state.checkoutId).then(checkout => {
          commit('updateCheckout', checkout);
        });
      }
    },
    getCheckoutId({ commit, state }) {
      const checkoutIDLocalStorage = localStorage.getItem('shopify_checkout_id');

      if (checkoutIDLocalStorage) {
        commit('updateCheckoutId', checkoutIDLocalStorage);
      } else {
        client.checkout.create().then(checkout => {
          localStorage.setItem('shopify_checkout_id', checkout.id);
          commit('updateCheckoutId', checkout.id);
        });
      }
    },
    addVariantToCart({ commit, state }, payload) {
      if (!state.checkoutId) {
        client.checkout.create().then(checkout => {
          localStorage.setItem('shopify_checkout_id', checkout.id);
          commit('updateCheckoutId', checkout.id);
        });
      }
      client.checkout.addLineItems(state.checkoutId, payload).then(checkout => {
        commit('updateCheckout', checkout);
        commit('updateLastItemInCart', payload[0].variantId);
        commit('showPopover');
      });
    },
    async updateLineItemInCart({ commit, state }, payload) {
      commit('lineItemLoadingStatus', { id: payload[0].id, loading: true });
      try {
        const checkout = await client.checkout.updateLineItems(state.checkoutId, payload);
        commit('updateCheckout', checkout);
      } finally {
        commit('lineItemLoadingStatus', { id: payload[0].id, loading: false });
      }
    },
    async removeLineItemInCart({ commit, state }, id) {
      commit('removeLineItemLoadingStatus', { id, loading: true });
      try {
        const checkout = await client.checkout.removeLineItems(state.checkoutId, id);
        commit('updateCheckout', checkout);
      } finally {
        commit('removeLineItemLoadingStatus', { id, loading: false });
      }
    }
  }
});
