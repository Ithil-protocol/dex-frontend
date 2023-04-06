import Order from "./Order";
import { computedOrders } from "store/web3Store";

const Buy = () => {
  // const priceLevelsList: ContractInputs[] = [...Array(8)].map((_el, index) => {
  //   return {
  //     abi: contractABI,
  //     address: "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37",
  //     functionName: "priceLevels",
  //     args: [index],
  //   };
  // });
  // const { data, isLoading, isError } = useContractReads({
  //   contracts: priceLevelsList,
  // });
  // if (isLoading) return <p>is loading</p>;
  // if (isError) return <p>error</p>;
  // if (!data) return null;
  // return (
  //   <div>
  //     {(data as BigNumberish[]).map((priceLevel) => (
  //       <Order priceLevel={priceLevel} key={priceLevel?.toString()} />
  //     ))}
  //   </div>
  // );

  return (
    <>
      {computedOrders.slice(-8).map((order) => (
        <Order
          key={order.id + "taker"}
          data={{
            ...order,
            type: "taker",
          }}
        />
      ))}
    </>
  );
};

export default Buy;
