import type { BigNumberish } from "ethers";
import { contractABI } from "store/abi";
import { ContractInputs } from "types";
import { useContractReads } from "wagmi";
import Order from "./Order";

export const Buy = () => {
  const priceLevelsList: ContractInputs[] = [...Array(8)].map((el, index) => {
    return {
      abi: contractABI,
      address: "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37",
      functionName: "priceLevels",
      args: [index],
    };
  });
  const { data, isLoading, isError } = useContractReads({
    contracts: priceLevelsList,
  });

  if (isLoading) return <p>is loading</p>;
  if (isError) return <p>error</p>;
  if (!data) return null;
  // console.log(data);
  return (
    <div>
      {(data as BigNumberish[]).map((priceLevel) => (
        <Order priceLevel={priceLevel} key={priceLevel.toString()} />
      ))}
    </div>
  );
};
