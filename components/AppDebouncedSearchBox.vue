<template>
    <input type="search" v-model="query" class="input h-10 p-2  border-gray-400 border rounded-md focus:border"/>
  </template>
  
  <script>
  import { connectSearchBox } from 'instantsearch.js/es/connectors';
  import { createWidgetMixin } from 'vue-instantsearch/vue3/es';
  
  export default {
    mixins: [createWidgetMixin({ connector: connectSearchBox })],
    props: {
      delay: {
        type: Number,
        default: 400,
        required: false,
      },
    },
    data() {
      return {
        timerId: null,
        localQuery: '',
      };
    },
    destroyed() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
    },
    computed: {
      query: {
        get() {
          return this.localQuery;
        },
        set(val) {
          this.localQuery = val;
          if (this.timerId) {
            clearTimeout(this.timerId);
          }
          this.timerId = setTimeout(() => {
            this.state.refine(this.localQuery);
          }, this.delay);
        },
      },
    },
  };
  </script>