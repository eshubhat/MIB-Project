import mongoose, { Schema, Document } from "mongoose";

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

const ValidationRuleSchema = new Schema({
  required: { type: Boolean, default: false },
  minLength: { type: Number },
  maxLength: { type: Number },
  min: { type: Number },
  max: { type: Number },
  pattern: { type: String }, // Regex is stored as a string in MongoDB
});

const FormOptionSchema = new Schema({
  label: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true }, // Can be string, number, or boolean
});

const BaseFormFieldSchema = new Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  name: { type: String, required: true },
  placeholder: { type: String },
  type: { type: String, enum: Object.values(FormInputType), required: true },
  value: { type: Schema.Types.Mixed }, // Handles different types (string, number, boolean, file)
  validation: ValidationRuleSchema,
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
});

const DynamicFormFieldSchema = new Schema({
  ...BaseFormFieldSchema.obj,
  options: [FormOptionSchema], // Options are specific to Select, Radio, and Checkbox fields
  min: { type: Number }, // Specific to NumberField
  max: { type: Number }, // Specific to NumberField
});

// Main schema for dynamic forms
const DynamicFormSchema = new Schema({
  fields: [DynamicFormFieldSchema],
});

export const DynamicFormModel = mongoose.model(
  "DynamicForm",
  DynamicFormSchema
);
