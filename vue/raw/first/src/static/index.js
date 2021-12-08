// @ts-nocheck
var vueApp;
window.addEventListener('load', (e) => {
  registerComponentes();
  vueApp = new Vue({
    el: '#vue-app',
    data: {
      bus: new Vue(),
      totalCount: 0
    },
    methods: {
      onBigBoyClick: function (e) {
        this.bus.$emit('reset', { hi: 'hello' });
        this.totalCount = 0;
      },
      onChildIncr: function (e) {
        this.totalCount++;
      }
    },
    components: {}
  });
});

/**
 * Here we dfefine all componentes
 * For some reason components need to be registered before the Vue app
 */
function registerComponentes() {
  // ===
  Vue.component('ButtonCounter', {
    data: function () {
      return {
        count: 0
      };
    },
    props: ['bus'],

    methods: {
      increment: function () {
        this.count++;
        this.$emit('incremented', this.count);
      }
    },
    mounted: function () {
      this.bus.$on('reset', (data) => {
        this.count = 0;
        this.$emit('incremented', this.count);
      });
    },
    template:
      '<button class="small-btn" v-on:click="increment">{{ count }}</button>'
  });
  // ===
}
