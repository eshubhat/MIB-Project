export enum FormInputType {
  Text = "text",
  Number = "number",
  Email = "email",
  Password = "password",
  TextArea = "textarea",
  Select = "select",
  Radio = "radio",
  Checkbox = "checkbox",
  Date = "date",
  File = "file",
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
}

export interface FormOption {
  label: string;
  value: string | number | boolean;
}

export interface BaseFormField {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  type: FormInputType;
  value?: string | number | boolean | File | null;
  validation?: ValidationRule;
  disabled?: boolean;
  readonly?: boolean;
}

export interface TextField extends BaseFormField {
  type:
    | FormInputType.Text
    | FormInputType.Email
    | FormInputType.Password
    | FormInputType.TextArea;
  value?: string;
}

export interface NumberField extends BaseFormField {
  type: FormInputType.Number;
  value?: number;
  min?: number;
  max?: number;
}

export interface SelectField extends BaseFormField {
  type: FormInputType.Select;
  options: FormOption[];
  value?: string | number;
}

export interface RadioField extends BaseFormField {
  type: FormInputType.Radio;
  options: FormOption[];
  value?: string | number;
}

export interface CheckboxField extends BaseFormField {
  type: FormInputType.Checkbox;
  options?: FormOption[];
  value?: boolean;
}

export interface DateField extends BaseFormField {
  type: FormInputType.Date;
  value?: string;
}

export interface FileField extends BaseFormField {
  type: FormInputType.File;
  value?: File | null;
}

export type DynamicFormField =
  | TextField
  | NumberField
  | SelectField
  | RadioField
  | CheckboxField
  | DateField
  | FileField;

export interface DynamicForm {
  fields: DynamicFormField[];
  onSubmit: (values: Record<string, any>) => void;
  onChange?: (field: DynamicFormField, value: any) => void;
}
