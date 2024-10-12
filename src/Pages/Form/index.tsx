import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import DynamicFormComponent from "../../Components/Forms/DynamicFormComponent";
import { FormInputType, DynamicForm } from "../../Types/formTypes";
import { useParams } from "react-router-dom";

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
  onSubmit: (values, eventName: string) => {
    fetch("http://localhost:3000/api/form/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        form: values, // assuming `values` is already an object
        eventName: eventName,
      }),
    });
    console.log("Form submitted with values:", values);
  },
  onChange: (field, value) => {
    console.log(`Field ${field.name} changed to:`, value);
  },
};

const Form: React.FC = () => {
  const theme = useTheme();
  const { name } = useParams();
  return (
    <Box bgcolor="#ffffff" display="flex" flexDirection="column" gap={2}>
      <Typography
        variant="h4"
        textAlign="center"
        color="primary"
        sx={{ fontFamily: "Dela Gothic One, sans-serif !important" }}
      >
        Form Preview
      </Typography>
      <Box
        p={"2rem"}
        borderRadius="0.5rem"
        border={`1px solid ${theme.palette.primary.main}`}
      >
        <DynamicFormComponent initialForm={form} eventName={name as string} />
      </Box>
    </Box>
  );
};

export default Form;
