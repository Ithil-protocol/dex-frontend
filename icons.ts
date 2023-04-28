import ETH from "cryptocurrency-icons/svg/icon/eth.svg";
import USDC from "cryptocurrency-icons/svg/icon/usdc.svg";
import Generic from "cryptocurrency-icons/svg/icon/generic.svg";

// the "keies" in icons object must match underlyingLabels or accountingLabels
// if underlyingLabel is TokenX we should add it in the object like this:
// TokenX: anySVG-icon-file

export const icons = {
  WETH: ETH,
  FAUCET: Generic,
  USDC,
};
