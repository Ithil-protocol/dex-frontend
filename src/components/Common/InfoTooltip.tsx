import React from "react";
import LightTooltip from "./LightTooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface Props {
  title: string;
}

const InfoTooltip: React.FC<Props> = ({ title }) => {
  return (
    <LightTooltip title={title}>
      <InfoOutlinedIcon fontSize="small" />
    </LightTooltip>
  );
};

export default InfoTooltip;
