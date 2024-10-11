import React from "react";
import DynamicFormComponent from "../../Components/Forms/DynamicFormComponent";
import { FormInputType, DynamicForm } from "../../Types/formTypes";

const form: DynamicForm = {
  fields: [
    {
      id: "username",
      label: "Username",
      name: "username",
      type: FormInputType.Text,
      placeholder: "Enter your username",
      validation: { required: true, minLength: 3 },
    },
    {
      id: "email",
      label: "Email",
      name: "email",
      type: FormInputType.Email,
      placeholder: "Enter your email",
      validation: {
        required: true,
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      },
    },
    {
      id: "age",
      label: "Age",
      name: "age",
      type: FormInputType.Number,
      placeholder: "Enter your age",
      validation: { required: true, min: 18, max: 100 },
    },
    {
      id: "gender",
      label: "Gender",
      name: "gender",
      type: FormInputType.Radio,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
      validation: { required: true },
    },
    {
      id: "terms",
      label: "Accept Terms",
      name: "terms",
      type: FormInputType.Checkbox,
    },
  ],
  onSubmit: (values) => {
    console.log("Form submitted with values:", values);
  },
  onChange: (field, value) => {
    console.log(`Field ${field.name} changed to:`, value);
  },
};

const Form: React.FC = () => {
  return (
    <div>
      <h1>Dynamic Form Example</h1>
      <DynamicFormComponent initialForm={form} />
    </div>
  );
};

export default Form;
