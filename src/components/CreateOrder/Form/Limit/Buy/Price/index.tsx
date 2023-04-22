import FormGroup from "@mui/material/FormGroup/FormGroup";
import { Control } from "react-hook-form";
import PriceLabel from "./Label";
import PriceTextField from "./TextField";

interface Props {
  endLabel: string;
  control: Control<any, any>;
}

const Price: React.FC<Props> = (props) => {
  return (
    <FormGroup>
      <PriceLabel />
      <PriceTextField control={props.control} endLabel={props.endLabel} />
    </FormGroup>
  );
};

export default Price;
