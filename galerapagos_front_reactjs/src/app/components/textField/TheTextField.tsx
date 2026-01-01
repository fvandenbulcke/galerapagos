import { TextField } from "@mui/material";

function TheTextField({ label, value, placeholder, onChange }: { label?: string, value: string, placeholder?: string, onChange: (value: string) => void }) {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      required={true}
      label={label}
      placeholder={ placeholder }
      value={ value }
      onChange={ (e) => onChange(e.target.value) }
    />
  );
}

export default TheTextField;