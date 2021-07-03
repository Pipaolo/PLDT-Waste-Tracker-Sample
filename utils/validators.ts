import * as yup from "yup";
export const philippineNumberRegex = new RegExp("^(9|09|\\+639)\\d{9}$");
export const passwordRegex = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
);
export const nameRegex = new RegExp("^[a-z A-Z]+$");

export const loginScheme = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(philippineNumberRegex, "Invalid Phone Number"),
  password: yup
    .string()
    .min(6, "Password needs to be atleast 6 characters")
    .matches(
      passwordRegex,
      "Password must contain, 1 Uppercase character, Special Character and Number"
    )
    .required("This field is required"),
});

export const registerScheme = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(philippineNumberRegex, "Invalid Phone Number"),
  password: yup
    .string()
    .required("This field is required")
    .min(6, "Password needs to be atleast 6 characters")
    .matches(
      passwordRegex,
      "Password must contain, 1 Uppercase character, Special Character and Number"
    ),

  name: yup
    .string()
    .required("This field is required")
    .matches(nameRegex, "Name cannot have numbers or special characters"),
});
