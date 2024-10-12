import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Box,
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
  Typography,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  DynamicFormField,
  DynamicForm,
  FormInputType,
  ValidationRule,
  FormOption,
  TextField as TextFieldType,
  NumberField,
  SelectField,
  RadioField,
  CheckboxField,
  DateField,
  FileField,
} from "../../Types/formTypes";

interface DynamicFormComponentProps {
  initialForm: DynamicForm;
  eventName: string;
}

type NewFieldType = {
  label: string;
  name: string;
  type: FormInputType;
  options?: { label: string; value: string }[]; // For Radio options
};

const DynamicFormComponent: React.FC<DynamicFormComponentProps> = ({
  initialForm,
  eventName,
}) => {
  const [form, setForm] = useState<DynamicForm>(initialForm);
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [newField, setNewField] = useState<NewFieldType>({
    label: "",
    name: "",
    type: FormInputType.Text,
  });
  const [currentField, setCurrentField] = useState<DynamicFormField | null>(
    null
  );

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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("form: ", form);

    form.onSubmit(form.fields, eventName);
  };

  const handleAddField = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewField({ label: "", name: "", type: FormInputType.Text });
  };

  const handleDeleteField = (id: string) => {
    const updatedFields = form.fields.filter((field) => field.id !== id);
    setForm({ ...form, fields: updatedFields });
  };

  const handleOpenSettings = (field: DynamicFormField) => {
    setCurrentField(field);
    setSettingsOpen(true);
  };

  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (currentField) {
      setCurrentField({
        ...currentField,
        validation: {
          ...currentField.validation,
          [name]: type === "checkbox" ? checked : value,
        },
      });
    }
  };

  const handleSaveSettings = () => {
    if (currentField) {
      const updatedFields = form.fields.map((field) =>
        field.id === currentField.id ? currentField : field
      );
      setForm({ ...form, fields: updatedFields });
    }
    setSettingsOpen(false);
  };

  const handleNewFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setNewField({ ...newField, [e.target.name]: e.target.value });
  };

  const handleNewFieldTypeChange = (e: SelectChangeEvent<FormInputType>) => {
    const newType = e.target.value as FormInputType;
    setNewField((prev) => ({ ...prev, type: newType }));
  };

  const handleAddNewField = () => {
    if (newField.label && newField.name) {
      const newDynamicField: DynamicFormField = createNewField(newField);
      setForm((prevForm) => ({
        ...prevForm,
        fields: [...prevForm.fields, newDynamicField],
      }));
      handleCloseDialog();
    }
  };

  const createNewField = (field: NewFieldType): DynamicFormField => {
    const baseField = {
      id: `field-${Date.now()}`,
      label: field.label,
      name: field.name,
      placeholder: field.name,
      type: field.type,
      validation: {
        required: false,
      },
    };

    switch (field.type) {
      case FormInputType.Text:
      case FormInputType.Email:
      case FormInputType.Password:
      case FormInputType.TextArea:
        return { ...baseField, value: "" } as TextFieldType;
      case FormInputType.Number:
        return { ...baseField, value: 0 } as NumberField;
      case FormInputType.Select:
        return { ...baseField, options: [], value: "" } as SelectField;
      case FormInputType.Radio:
        // Make sure the options are passed here
        return {
          ...baseField,
          options: field.options || [],
          value: "",
        } as RadioField;
      case FormInputType.Checkbox:
        return { ...baseField, value: false } as CheckboxField;
      case FormInputType.Date:
        return { ...baseField, value: "" } as DateField;
      case FormInputType.File:
        return { ...baseField, value: null } as FileField;
      default:
        return { ...baseField, value: "" } as TextFieldType;
    }
  };

  const renderFieldSettings = (field: DynamicFormField) => {
    const commonSettings = (
      <>
        <FormControlLabel
          control={
            <Switch
              checked={field.validation?.required || false}
              onChange={handleSettingsChange}
              name="required"
            />
          }
          label="Required"
        />
        {field.type !== FormInputType.Checkbox && (
          <>
            <TextField
              margin="dense"
              name="minLength"
              label="Min Length"
              type="number"
              value={field.validation?.minLength || ""}
              onChange={handleSettingsChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="maxLength"
              label="Max Length"
              type="number"
              value={field.validation?.maxLength || ""}
              onChange={handleSettingsChange}
              fullWidth
            />
          </>
        )}
      </>
    );

    switch (field.type) {
      case FormInputType.Number:
        return (
          <>
            {commonSettings}
            <TextField
              margin="dense"
              name="min"
              label="Min Value"
              type="number"
              value={(field as NumberField).min || ""}
              onChange={handleSettingsChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="max"
              label="Max Value"
              type="number"
              value={(field as NumberField).max || ""}
              onChange={handleSettingsChange}
              fullWidth
            />
          </>
        );
      case FormInputType.Email:
        return (
          <>
            {commonSettings}
            <TextField
              margin="dense"
              name="pattern"
              label="Email Pattern"
              type="text"
              value={field.validation?.pattern?.toString() || ""}
              onChange={handleSettingsChange}
              fullWidth
            />
          </>
        );
      case FormInputType.File:
        return commonSettings;

      default:
        return commonSettings;
    }
  };

  const [option, setOption] = useState({ label: "", value: "" });

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOption((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOption = () => {
    if (option.label && option.value) {
      setNewField((prev) => ({
        ...prev,
        options: [...(prev.options || []), option],
      }));
      setOption({ label: "", value: "" }); // Clear input after adding
    }
  };

  const handleRemoveOption = (index: number) => {
    setNewField((prev) => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || [],
    }));
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2}>
        {form.fields.map((field) => (
          <div key={field.id} style={{ display: "flex", alignItems: "center" }}>
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              justifyContent="center"
            >
              <Box display="flex" gap={1} alignItems="center">
                <Typography
                  variant="body1"
                  color="primary"
                  sx={{ fontFamily: "Dela Gothic One, sans-serif !important" }}
                >
                  {field.label}
                </Typography>
                <IconButton onClick={() => handleOpenSettings(field)}>
                  <SettingsIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteField(field.id)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </Box>
              {renderField(field, handleChange)}
            </Box>
          </div>
        ))}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddField}
          color="primary"
        >
          Add input field
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </Box>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New Field</DialogTitle>
        <DialogContent>
          {/* Existing fields for label, name, and type */}
          <TextField
            autoFocus
            margin="dense"
            name="label"
            label="Field Label"
            type="text"
            value={newField.label}
            onChange={handleNewFieldChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="name"
            label="Field Name"
            type="text"
            value={newField.name}
            onChange={handleNewFieldChange}
            fullWidth
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Field Type</InputLabel>
            <Select
              value={newField.type}
              onChange={handleNewFieldTypeChange}
              label="Field Type"
            >
              <MenuItem value={FormInputType.Text}>Text</MenuItem>
              <MenuItem value={FormInputType.Email}>Email</MenuItem>
              <MenuItem value={FormInputType.Password}>Password</MenuItem>
              <MenuItem value={FormInputType.Number}>Number</MenuItem>
              <MenuItem value={FormInputType.TextArea}>TextArea</MenuItem>
              <MenuItem value={FormInputType.Select}>Select</MenuItem>
              <MenuItem value={FormInputType.Radio}>Radio</MenuItem>
              <MenuItem value={FormInputType.Checkbox}>Checkbox</MenuItem>
              <MenuItem value={FormInputType.Date}>Date</MenuItem>
              <MenuItem value={FormInputType.File}>File</MenuItem>
            </Select>
          </FormControl>

          {/* Conditionally render options input for Radio type */}
          {newField.type === FormInputType.Radio && (
            <>
              <TextField
                margin="dense"
                name="label"
                label="Option Label"
                type="text"
                value={option.label}
                onChange={handleOptionChange}
                fullWidth
              />
              <TextField
                margin="dense"
                name="value"
                label="Option Value"
                type="text"
                value={option.value}
                onChange={handleOptionChange}
                fullWidth
              />
              <Button onClick={handleAddOption} color="primary">
                Add Option
              </Button>
              <ul>
                {newField.options?.map((opt, index) => (
                  <li key={index}>
                    {opt.label} ({opt.value}){" "}
                    <IconButton onClick={() => handleRemoveOption(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddNewField} color="primary">
            Add Field
          </Button>
        </DialogActions>
      </Dialog>

      {currentField && (
        <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}>
          <DialogTitle>Field Settings</DialogTitle>
          <DialogContent>{renderFieldSettings(currentField)}</DialogContent>
          <DialogActions>
            <Button onClick={() => setSettingsOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveSettings} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

const renderField = (
  field: DynamicFormField,
  handleChange: (
    field: DynamicFormField
  ) => (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => void
) => {
  const commonProps = {
    id: field.id,
    label: field.label,
    name: field.name,
    placeholder: field.placeholder,
    value: field.value ?? "",
    onChange: handleChange(field),
    required: field.validation?.required,
    fullWidth: true,
    margin: "normal" as const,
  };

  switch (field.type) {
    case FormInputType.Text:
    case FormInputType.Email:
    case FormInputType.Password:
      return (
        <TextField
          {...commonProps}
          type={field.type}
          inputProps={{
            minLength: field.validation?.minLength,
            maxLength: field.validation?.maxLength,
            pattern: field.validation?.pattern?.toString(),
          }}
        />
      );
    case FormInputType.Number:
      return (
        <TextField
          {...commonProps}
          type="number"
          inputProps={{
            min: (field as NumberField).min,
            max: (field as NumberField).max,
          }}
        />
      );
    case FormInputType.TextArea:
      return <TextField {...commonProps} multiline rows={4} />;
    case FormInputType.Checkbox:
      return (
        <FormControlLabel
          control={
            <Checkbox
              id={field.id}
              name={field.name}
              checked={!!(field as CheckboxField).value}
              onChange={handleChange(field)}
              required={field.validation?.required}
            />
          }
          label={field.label}
        />
      );
    case FormInputType.Radio:
      return (
        <RadioGroup
          name={field.name}
          value={(field as RadioField).value}
          onChange={handleChange(field)}
        >
          {(field as RadioField).options.map((option) => (
            <FormControlLabel
              key={String(option.value)}
              value={option.value}
              control={<Radio required={field.validation?.required} />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      );
    case FormInputType.Select:
      return (
        <TextField
          {...commonProps}
          select
          required={field.validation?.required}
        >
          {(field as SelectField).options.map((option) => (
            <MenuItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
    case FormInputType.Date:
      return <TextField {...commonProps} type="date" />;
    case FormInputType.File:
      return (
        <TextField
          {...commonProps}
          type="file"
          InputLabelProps={{ shrink: true }}
        />
      );
    default:
      return null;
  }
};

export default DynamicFormComponent;
