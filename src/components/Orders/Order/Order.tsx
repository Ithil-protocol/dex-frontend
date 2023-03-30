import { BigNumberish, ethers } from "ethers";
import { useState } from "react";
import { contractABI } from "store/abi";
import { ContractInputs, Order as OrderType } from "types";
import { useContractRead, useContractReads } from "wagmi";
import styles from "./Order.module.scss";

interface Props {
  priceLevel: BigNumberish;
}

const Order: React.FC<Props> = ({ priceLevel }) => {
  const [orderList, setOrderList] = useState<undefined | ContractInputs[]>();
  const { data } = useContractRead({
    address: "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37",
    abi: contractABI,
    functionName: "id",
    args: [priceLevel],
    onSuccess(data) {
      setOrderList((prevState) => {
        return [
          ...Array(Number(ethers.utils.formatUnits(data as BigNumberish, 0))),
        ].map((el, index) => {
          return {
            address: "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37",
            abi: contractABI,
            functionName: "orders",
            args: [priceLevel, index + 1],
          };
        });
      });
    },
  });

  const { data: orderData } = useContractReads({
    contracts: orderList,
  });
  if (!data) return null;
  console.log(orderData);

  // const base = 20;
  // const width = (Math.min(data.volume, base) / base) * 100 + "%";

  return (
    <>
      {/* <div className={styles.order} data-type={data.type}>
      <div className={styles.background} style={{ width }}></div>
      <p className={styles.value}>{data.value}</p>
      <p>{data.volume}</p>
    </div> */}
    </>
  );
};

export default Order;
