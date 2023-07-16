"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _TicketForm = _interopRequireDefault(require("./TicketForm"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SupportTicket extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "setFiles", files => {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        files
      }));
    });

    _defineProperty(this, "onSubmit", async data => {
      this.setState(_objectSpread(_objectSpread({}, this.state.api), {}, {
        loading: true
      }));
      const formData = new FormData();
      formData.append('subject', data.subject);
      formData.append('body', data.body);
      formData.append('priority', data.priority);

      for (let i = 0; i < this.state.files.length; i++) {
        formData.append('files', this.state.files[i]);
      }

      return _axios.default.post(this.state.api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      }).then(results => {
        if (results.data.success) {
          console.log("Success!");
          this.setState({
            error: false,
            submitted: true,
            loading: false
          });
        } else this.setState({
          error: true
        });
      }).catch(err => {
        console.log("error: ", err);
        this.setState({
          error: true,
          loading: false
        });
      });
    });

    this.state = {
      error: false,
      message: null,
      submitted: false,
      loading: false,
      files: [],
      api: props.apiPath ? props.apiPath : '/api/supportticket/submit'
    };
  }

  componentDidMount() {}

  render() {
    const {
      error,
      submitted,
      loading
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "card"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "card-body login-card-body"
    }, /*#__PURE__*/_react.default.createElement("p", {
      className: "login-box-msg"
    }, "Have an Issue? Submit a support ticket to ", /*#__PURE__*/_react.default.createElement("a", {
      href: "https://liveacid.com"
    }, "LiveACID Software")), loading && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Spinner, {
      animation: "border",
      role: "status"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "visually-hidden"
    }, "Loading...")), !loading && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !submitted && /*#__PURE__*/_react.default.createElement(_TicketForm.default, {
      onSubmit: this.onSubmit,
      error: error,
      setFiles: this.setFiles
    }), submitted && /*#__PURE__*/_react.default.createElement("p", null, "Submitted Thanks!"))));
  }

}

var _default = SupportTicket;
exports.default = _default;