import { BigNumber, utils } from "ethers";
import { fixPrecision } from "@/utility/converters";
import { STAKED_DECIMALS, STAKED_PRECISION } from "@/config/constants";

export const useStakedConverter = () => {
  return (stake: BigNumber) => {
    const value = Number(utils.formatUnits(stake, STAKED_DECIMALS));
    return fixPrecision(value, STAKED_PRECISION);
  };
};
