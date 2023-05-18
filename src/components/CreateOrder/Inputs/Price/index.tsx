import FormGroup from "@mui/material/FormGroup/FormGroup";
import { Control, FieldValues } from "react-hook-form";
import Label from "./Label";
import TextField from "./TextField";

interface Props<T extends FieldValues> {
  endLabel: string;
  control: Control<T>;
}

function Price<FieldValue extends FieldValues>(props: Props<FieldValue>) {
  return (
    <FormGroup>
      <Label />
      <TextField control={props.control} endLabel={props.endLabel} />
    </FormGroup>
  );
}

export default Price;
