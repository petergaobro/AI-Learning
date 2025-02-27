
import type { ReactNode } from "react";
import { type Validate } from "react-hook-form";
/* inputType */
type fieldType =
  | "text"
  | "email"
  | "password"


interface ModelErrorMessages {
  required?: string;
  min?: string;
  max?: string;
  minLength?: string;
  maxLength?: string;
  pattern?: string;
}

interface ModelField {
  field: string; // fieldName
  name: string; // displayName
  type: fieldType;
  section?: string; // used for filtering a model to only show fields from this section
  default?: any; // TODO cannot do any
  placeholder?: string;
  helperText?: string;
  createable?: boolean; // can only be edited when creating
  editable?: boolean; // can be edited or readonly
  parent?: string; // fieldName of parent: used for conditionals

  required?: boolean;
  // validate?: Validate<any> | Record<string, Validate<any>>;
  errorMessages?: ModelErrorMessages;

  unique?: boolean; // not sure we need this here

  secondaryLink?: string; // link to somewhere
  secondaryLinkText?: string;
  showIf?: (object: any /* TODO */) => boolean;
  hideLabel?: boolean;
  labelCols?: number;
  inputCols?: number;
  fieldCols?: number;
  indentLabel?: boolean;
}

export interface ModelTextField extends ModelField {
  type: "text";
  rows?: number;
  defaultText?: string;
  minLength?: number;
  maxLength?: number;
  showTextAreaName?: boolean;
  transform?: (v: string) => string;
}

export interface ModelEmailField extends ModelField {
  type: "email";
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  showTextAreaName?: boolean;
}

export interface ModelPasswordField extends ModelField {
  type: "password";
  showToggle?: boolean;
  minLength?: number;
  maxLength?: number;
  showTextAreaName?: boolean;
}

export type ModelTextFieldType =
  | ModelTextField
  | ModelPasswordField
  | ModelEmailField

export type ModelFieldType =
  | ModelTextFieldType;

type Model = Array<ModelFieldType>;

export default Model;