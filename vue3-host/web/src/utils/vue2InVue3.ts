/* eslint-disable no-restricted-syntax */
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js';
export function Vue2InVue3(WrappedComponent: any, id: string) {
  let vm: any;
  return {
    mounted() {
      vm = new Vue({
        render: (createElement: Function) => {
          // eslint-disable-next-line no-loops/no-loops
          for (const key in this.$attrs) {
            if (typeof this.$attrs[key] === 'function') {
              this.$attrs[key] = this.$attrs[key].fns;
            }
          }
          return createElement(
            WrappedComponent,
            {
              props: this.$attrs,
              on: this.$attrs, // Vue3 移除了 $listeners，通过 $attrs 透传函数
              // scopedSlots: this.$scopedSlots, // 透传 scopedSlots
              attrs: this.$attrs,
            },
            this.$slots,
          );
        },
      });
      vm?.$mount(`#${id}`);
    },
    render() {
      vm?.$forceUpdate();
    },
  };
}
