import { Button } from "@mui/material";
import React from "react";
import { Control, useWatch } from "react-hook-form";

interface Props {
  label: string;
  control: Control<any, any>;
}

const Submit: React.FC<Props> = ({ label, control }) => {
  const formValues = useWatch({ control });
  console.log(formValues);

  return (
    <Button
      fullWidth
      disabled={!formValues.price || !formValues.amount}
      sx={{
        backgroundColor: "#8a8a8a",
        color: "white",
        textTransform: "none",
        ":disabled": {
          color: "#ffffff7d",
          backgroundColor: "#787878",
        },
      }}
      type="submit"
    >
      Buy {label}
    </Button>
  );
};

export default Submit;
