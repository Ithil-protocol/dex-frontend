import { Box } from "@mui/material";
import { Pool } from "types";

const RenderOption = (props: any, option: Pool) => (
    <Box component="li" {...props}>
         {option.underlyingLabel} {option.accountingLabel} {option.accountingIcon} {option.underlyingIcon}
    </Box>
)

export default RenderOption;