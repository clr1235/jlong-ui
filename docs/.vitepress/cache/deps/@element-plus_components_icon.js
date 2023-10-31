import {
  computed2 as computed,
  createBlock,
  defineComponent,
  mergeProps,
  openBlock,
  renderSlot
} from "./chunk-LTCY66NN.js";
import "./chunk-DVGAO4ER.js";
import "./chunk-UXIASGQL.js";

// ../node_modules/.pnpm/@element-plus+components@0.0.5_vue@3.2.47/node_modules/@element-plus/components/icon/index.js
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var script = defineComponent({
  name: "ElIcon",
  props: {
    size: {
      type: Number
    },
    color: {
      type: String
    }
  },
  setup(props) {
    return {
      style: computed(() => {
        if (!props.size && !props.color) {
          return {};
        }
        return __spreadValues(__spreadValues({}, props.size ? { "--font-size": `${props.size}px` } : {}), props.color ? { "--color": props.color } : {});
      })
    };
  }
});
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("i", mergeProps({
    class: "el-icon",
    style: _ctx.style
  }, _ctx.$attrs), [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
script.render = render;
script.__file = "packages/components/icon/src/index.vue";
script.install = (app) => {
  app.component(script.name, script);
};
var _Icon = script;
var ElIcon = _Icon;
var icon_default = _Icon;
export {
  ElIcon,
  icon_default as default
};
//# sourceMappingURL=@element-plus_components_icon.js.map
