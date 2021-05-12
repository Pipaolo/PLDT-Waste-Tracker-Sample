import * as yup from "yup";

export const loginScheme = yup.object().shape({
  username: yup.string().required("This field is required"),
  pin: yup
    .string()
    .required("This field is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(4, "Must be exactly 4 digits")
    .max(4, "Must be exactly 4 digits"),
});

export const philippineNumberRegex = new RegExp("^(09|\\+639)\\d{9}$");

export const registerScheme = yup.object().shape({
  username: yup.string().required("This field is required"),
  pin: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(4, "Must be exactly 4 digits")
    .max(4, "Must be exactly 4 digits"),
  phoneNumber: yup
    .string()
    .matches(philippineNumberRegex, "Invalid Phone Number"),
  name: yup.string().required("This field is required"),
});
