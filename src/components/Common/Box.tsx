import { Box, SxProps, Theme } from "@mui/material";
import React from "react";

interface Props {
  overrideStyles?: SxProps<Theme>;
  [key: string]: any;
}

const WrapperBox: React.FC<Props> = ({ overrideStyles, ...rest }) => {
  const defaultStyles = {
    borderRadius: "5px",
  };

  const mergeStyles = (overrideStyles) => ({
    ...defaultStyles,
    ...overrideStyles,
  });

  const sx =
    typeof overrideStyles === "function"
      ? (theme: Theme) => mergeStyles(overrideStyles(theme))
      : mergeStyles(overrideStyles);

  return <Box sx={sx} {...rest} />;
};

export default WrapperBox;
