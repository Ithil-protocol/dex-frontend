import FormGroup from "@mui/material/FormGroup/FormGroup";
import { Control } from "react-hook-form";
import Label from "./Label";
import TextField from "./TextField";

interface Props {
  endLabel: string;
  control: Control<any, any>;
}

const Price: React.FC<Props> = (props) => {
  return (
    <FormGroup>
      <Label />
      <TextField control={props.control} endLabel={props.endLabel} />
    </FormGroup>
  );
};

export default Price;
