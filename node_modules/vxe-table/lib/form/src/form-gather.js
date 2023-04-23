"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formItem = _interopRequireDefault(require("./form-item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'VxeFormGather',
  extends: _formItem.default,
  provide: function provide() {
    return {
      xeformgather: this
    };
  },
  render: function render(h) {
    return h('div', this.$slots.default);
  }
};
exports.default = _default;