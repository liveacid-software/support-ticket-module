"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formik = require("formik");

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var Yup = _interopRequireWildcard(require("yup"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const TicketForm = _ref => {
  let {
    onSubmit,
    error,
    setFiles
  } = _ref;
  const hiddenFileInput = (0, _react.useRef)(null);
  const [errorMessage, setErrorMessage] = (0, _react.useState)('');
  const [selectedFiles, setSelectedFiles] = (0, _react.useState)([]);

  const handleClick = e => {
    hiddenFileInput.current.click();
  };

  const addFile = async (filePicker, values, setFieldValue) => {
    console.log('***** addFile start *****');
    console.log('***** values.filest *****', values.files);
    console.log('***** filePicker.currentTarget.files.length *****', filePicker.currentTarget.files.length);
    if (!values.files || filePicker.currentTarget.files.length == 0) return;
    console.log('***** values.files *****', values.files);
    const files = filePicker.currentTarget.files;
    console.log('***** files *****', files);

    if (files.length > 2 || selectedFiles.length + files.length > 2) {
      setErrorMessage('Please select a maximum of 2 files.');
      return;
    } else {
      setErrorMessage('');
    }

    if (!validateFile(files)) {
      setErrorMessage('The selected file type is invalid.');
      return;
    } else {
      setErrorMessage('');
    }

    setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, ...Array.from(files)]);
    setFieldValue('files', files);
    setFiles(filePicker.currentTarget.files);
    console.log('***** got here *****');
  };

  const validateFile = files => {
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.svg|\.log|\.docx|\.xlsx|\.pptx|\.txt|\.pdf|\.zip|\.gz|\.tgz|\.mp4|\.mov|\.webm)$/i;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = files[i];

      if (!allowedExtensions.exec(file.name)) {
        setErrorMessage('Invalid File Type');
        return false;
      }
    }

    return true;
  };

  const handleRemove = index => {
    setSelectedFiles(prevSelectedFiles => prevSelectedFiles.filter((_, i) => i !== index));
  };

  const SupportTicketSchema = Yup.object().shape({
    subject: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    body: Yup.string().required('Required'),
    priority: Yup.string().required('Required')
  });
  return /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    initialValues: {
      subject: '',
      body: '',
      priority: '',
      files: []
    },
    onSubmit: onSubmit,
    validationSchema: SupportTicketSchema
  }, _ref2 => {
    let {
      values,
      setFieldValue,
      errors,
      touched
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_formik.Form, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      type: "text",
      name: "subject",
      placeholder: "Subject",
      className: "form-control input-field"
    }), touched.subject && errors.subject && /*#__PURE__*/_react.default.createElement("div", {
      style: {
        color: 'red'
      }
    }, "Subject is required")), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      as: "textarea",
      name: "body",
      placeholder: "Describe issue",
      className: "form-control input-field"
    }), touched.body && errors.body && /*#__PURE__*/_react.default.createElement("div", {
      style: {
        color: 'red'
      }
    }, "Description is required")), /*#__PURE__*/_react.default.createElement(_formik.Field, {
      name: "files",
      type: "hidden"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group",
      style: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: 'auto',
        marginRight: '8px'
      }
    }, /*#__PURE__*/_react.default.createElement("input", {
      hidden: true,
      multiple: true,
      id: "files",
      ref: hiddenFileInput,
      name: "files",
      type: "file",
      onChange: async e => {
        addFile(e, values, setFieldValue);
      }
    }), /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: "form-control",
      onClick: handleClick
    }, /*#__PURE__*/_react.default.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M14.86 5.64222L6.04438 14.4608C5.6437 14.8758 5.42204 15.4315 5.42714 16.0083C5.43224 16.5852 5.6637 17.1369 6.07166 17.5448C6.47962 17.9526 7.03144 18.1839 7.60827 18.1888C8.18511 18.1937 8.74079 17.9719 9.15565 17.5711L17.9703 8.75155C18.3905 8.34566 18.7257 7.86015 18.9563 7.32333C19.1869 6.78652 19.3083 6.20915 19.3134 5.62492C19.3185 5.0407 19.2071 4.46131 18.9859 3.92057C18.7647 3.37982 18.438 2.88856 18.0248 2.47543C17.6117 2.06231 17.1204 1.73559 16.5797 1.51436C16.0389 1.29312 15.4596 1.1818 14.8753 1.18687C14.2911 1.19195 13.7137 1.31333 13.1769 1.54393C12.6401 1.77453 12.1546 2.10973 11.7487 2.52997L2.9331 11.3446C1.69536 12.5823 1 14.2611 1 16.0115C1 17.7619 1.69536 19.4407 2.9331 20.6784C4.17084 21.9162 5.84958 22.6115 7.60002 22.6115C9.35045 22.6115 11.0292 21.9162 12.2669 20.6784L23 10",
      stroke: "#71717A"
    })))), selectedFiles.map((file, index) => /*#__PURE__*/_react.default.createElement("div", {
      key: index
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: URL.createObjectURL(file),
      alt: "Preview ".concat(index),
      style: {
        width: '200px',
        height: '200px'
      }
    }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      variant: "danger",
      onClick: () => handleRemove(index)
    }, "Remove")))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react.default.createElement(_formik.Field, {
      as: "select",
      name: "priority",
      className: "form-control"
    }, /*#__PURE__*/_react.default.createElement("option", {
      value: ""
    }, "Priority Level"), /*#__PURE__*/_react.default.createElement("option", {
      value: "emergency"
    }, "Emergency"), /*#__PURE__*/_react.default.createElement("option", {
      value: "high"
    }, "High"), /*#__PURE__*/_react.default.createElement("option", {
      value: "medium"
    }, "Medium"), /*#__PURE__*/_react.default.createElement("option", {
      value: "low"
    }, "Low")), touched.priority && errors.priority && /*#__PURE__*/_react.default.createElement("div", {
      style: {
        color: 'red'
      }
    }, "Priority is required")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      type: "submit",
      className: "btn btn-lg btn-inreach btn-block btn-bordred btn-flat sign-up-btn sign-in-btn"
    }, "Submit"), error && /*#__PURE__*/_react.default.createElement("div", {
      className: "alert alert-danger"
    }, "Sorry, something went wrong. Please fill out all fields and try again."), !error && errorMessage !== '' && /*#__PURE__*/_react.default.createElement("div", {
      className: "alert alert-danger"
    }, errorMessage));
  });
};

var _default = TicketForm;
exports.default = _default;