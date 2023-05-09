import ETH from "cryptocurrency-icons/svg/icon/eth.svg";
import USDC from "cryptocurrency-icons/svg/icon/usdc.svg";
import DAI from "cryptocurrency-icons/svg/icon/dai.svg";
import WBTC from "cryptocurrency-icons/svg/icon/wbtc.svg";

// the "keys" in icons object must match underlyingLabels or accountingLabels
// if underlyingLabel is TokenX we should add it in the object like this:
// TokenX: any-SVG-icon-file

export const icons = {
  WETH: ETH,
  USDC,
  DAI,
  WBTC,
};
