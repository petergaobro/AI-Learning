import createModelSchema from "../../app/utils/createModelSchema";
import type Model from "../../app/types/model";

export const model: Model = [
  {
    field: "email",
    name: "name",
    type: "email",
    required: true,
    placeholder: "Enter your MyERC™ email address",
    editable: true,
    errorMessages: {
      pattern: "Invalid email address",
    },
  },
  {
    field: "password",
    name: "Password",
    type: "password",
    required: true,
    placeholder: "Enter the password that accompanies your name.",
    editable: true,
    minLength: 8,
    errorMessages: {
      minLength: "Must be 8 or more characters long",
    },
    secondaryLink: "/reset",
    secondaryLinkText: "Forgot password?",
  },
];

export const schema = createModelSchema(model);

export default model;
