import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  MenuItem,
  Checkbox,
  Radio,
  FormControlLabel,
  RadioGroup,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  DynamicFormField,
  DynamicForm,
  FormInputType,
  FormOption,
  TextField as TextFieldType,
  NumberField,
  SelectField,
  RadioField,
  CheckboxField,
} from "../../Types/formTypes";

interface DynamicFormComponentProps {
  initialForm: DynamicForm;
}

type NewFieldType = {
  label?: string;
  name?: string;
  type: FormInputType;
};

const DynamicFormComponent: React.FC<DynamicFormComponentProps> = ({
  initialForm,
}) => {
  const [form, setForm] = useState<DynamicForm>(initialForm);
  const [open, setOpen] = useState(false);
  const [newField, setNewField] = useState<NewFieldType>({
    type: FormInputType.Text,
  });

  const handleChange =
    (field: DynamicFormField) =>
    (
      e: ChangeEvent<
        | HTMLInputElement
        | HTMLTextAreaElement
        | { name?: string; value: unknown }
      >
    ) => {
      const { name, type, value, checked } = e.target as HTMLInputElement;
      let fieldValue: any = value;

      if (type === "checkbox") {
        fieldValue = checked;
      } else if (type === "number") {
        fieldValue = parseFloat(value as string);
      }

      const updatedFields = form.fields.map((f) =>
        f.id === field.id ? { ...f, value: fieldValue } : f
      );
      setForm({ ...form, fields: updatedFields });
      form.onChange && form.onChange(field, fieldValue);
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = form.fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {} as Record<string, any>);
    form.onSubmit(formValues);
  };

  const handleAddField = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewField({ type: FormInputType.Text });
  };

  const handleNewFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setNewField({ ...newField, [e.target.name]: e.target.value });
  };

  const handleNewFieldTypeChange = (e: SelectChangeEvent<FormInputType>) => {
    const newType = e.target.value;
    setNewField((prev) => ({ ...prev, type: newType as FormInputType }));
  };

  const handleAddNewField = () => {
    if (newField.label && newField.name) {
      let newDynamicField: DynamicFormField;

      switch (newField.type) {
        case FormInputType.Text:
        case FormInputType.Email:
        case FormInputType.Password:
        case FormInputType.TextArea:
          newDynamicField = {
            id: `field-${Date.now()}`,
            label: newField.label,
            name: newField.name,
            type: newField.type,
            value: "",
          };
          break;
        case FormInputType.Number:
          newDynamicField = {
            id: `field-${Date.now()}`,
            label: newField.label,
            name: newField.name,
            type: newField.type,
            value: 0,
          };
          break;
        case FormInputType.Select:
        case FormInputType.Radio:
          newDynamicField = {
            id: `field-${Date.now()}`,
            label: newField.label,
            name: newField.name,
            type: newField.type,
            options: [],
            value: "",
          };
          break;
        case FormInputType.Checkbox:
          newDynamicField = {
            id: `field-${Date.now()}`,
            label: newField.label,
            name: newField.name,
            type: newField.type,
            value: false,
          };
          break;
        case FormInputType.Date:
          newDynamicField = {
            id: `field-${Date.now()}`,
            label: newField.label,
            name: newField.name,
            type: newField.type,
            value: "",
          };
          break;
        case FormInputType.File:
          newDynamicField = {
            id: `field-${Date.now()}`,
            label: newField.label,
            name: newField.name,
            type: newField.type,
            value: null,
          };
          break;
        default:
          return; // Invalid type, don't add the field
      }

      setForm((prevForm) => ({
        ...prevForm,
        fields: [...prevForm.fields, newDynamicField],
      }));
      handleCloseDialog();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {form.fields.map((field) => (
          <div key={field.id}>
            {field.type === FormInputType.Text ||
            field.type === FormInputType.Email ||
            field.type === FormInputType.Password ||
            field.type === FormInputType.Number ? (
              <TextField
                id={field.id}
                label={field.label}
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
                value={field.value ?? ""}
                onChange={handleChange(field)}
                required={field.validation?.required}
                inputProps={{
                  minLength: field.validation?.minLength,
                  maxLength: field.validation?.maxLength,
                  min: field.validation?.min,
                  max: field.validation?.max,
                }}
                fullWidth
                margin="normal"
              />
            ) : field.type === FormInputType.Checkbox ? (
              <FormControlLabel
                control={
                  <Checkbox
                    id={field.id}
                    name={field.name}
                    checked={!!field.value}
                    onChange={handleChange(field)}
                  />
                }
                label={field.label}
              />
            ) : field.type === FormInputType.Radio && "options" in field ? (
              <RadioGroup
                name={field.name}
                value={field.value}
                onChange={handleChange(field)}
              >
                {field.options.map((option) => (
                  <FormControlLabel
                    key={String(option.value)}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            ) : field.type === FormInputType.Select && "options" in field ? (
              <TextField
                select
                id={field.id}
                label={field.label}
                name={field.name}
                value={field.value ?? ""}
                onChange={handleChange(field)}
                fullWidth
                margin="normal"
              >
                {field.options.map((option) => (
                  <MenuItem
                    key={String(option.value)}
                    value={option.value as string | number}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
          </div>
        ))}
        <IconButton onClick={handleAddField} color="primary">
          <AddIcon />
        </IconButton>
        <button type="submit">Submit</button>
      </form>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New Field</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="label"
            label="Field Label"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setNewField((prev) => ({ ...prev, label: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            name="name"
            label="Field Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setNewField((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Field Type</InputLabel>
            <Select
              name="type"
              value={newField.type}
              onChange={handleNewFieldTypeChange}
            >
              <MenuItem value={FormInputType.Text}>Text</MenuItem>
              <MenuItem value={FormInputType.Number}>Number</MenuItem>
              <MenuItem value={FormInputType.Email}>Email</MenuItem>
              <MenuItem value={FormInputType.Password}>Password</MenuItem>
              <MenuItem value={FormInputType.TextArea}>Text Area</MenuItem>
              <MenuItem value={FormInputType.Select}>Select</MenuItem>
              <MenuItem value={FormInputType.Radio}>Radio</MenuItem>
              <MenuItem value={FormInputType.Checkbox}>Checkbox</MenuItem>
              <MenuItem value={FormInputType.Date}>Date</MenuItem>
              <MenuItem value={FormInputType.File}>File</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddNewField}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DynamicFormComponent;
