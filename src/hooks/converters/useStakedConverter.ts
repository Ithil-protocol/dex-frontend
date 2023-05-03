import { BigNumber, utils } from "ethers";
import { fixPrecision } from "@/utility/converters";

export const useStakedConverter = () => {
  return (stake: BigNumber) => {
    const value = Number(utils.formatUnits(stake, 18));
    return fixPrecision(value, 6);
  };
};
