import { Button } from "@mui/material";

function TheButton({ label, onClick }) {
  return <Button variant="contained" onClick={ onClick }>{ label }</Button>;
};

export default TheButton;