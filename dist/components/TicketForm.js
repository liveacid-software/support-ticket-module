"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formik = require("formik");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TicketForm = _ref => {
  let {
    onSubmit,
    error
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    initialValues: {
      subject: '',
      body: ''
    },
    onSubmit: onSubmit
  }, /*#__PURE__*/_react.default.createElement(_formik.Form, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
    type: "text",
    name: "subject",
    placeholder: "Subject",
    className: "form-control input-field"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
    as: "textarea",
    name: "body",
    placeholder: "Describe issue",
    className: "form-control input-field"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
    as: "select",
    name: "priority",
    className: "form-control input-field"
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "emergency"
  }, "Emergency"), /*#__PURE__*/_react.default.createElement("option", {
    value: "high"
  }, "High"), /*#__PURE__*/_react.default.createElement("option", {
    value: "medium"
  }, "Mediu "), /*#__PURE__*/_react.default.createElement("option", {
    value: "low"
  }, "Low"))), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    className: "btn btn-lg btn-inreach btn-block btn-bordred btn-flat sign-up-btn sign-in-btn"
  }, "Submit"), error && /*#__PURE__*/_react.default.createElement("div", {
    className: "alert alert-danger"
  }, "Sorry something went wrong. Please fill out all fields and try again.")));
};

var _default = TicketForm;
exports.default = _default;