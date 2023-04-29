import { configureChains, createClient, goerli, erc20ABI } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { readContracts } from "wagmi";
import fs from "fs";
import { rawFactoryABI } from "../store/abi-raw.mjs";

import addresses from "../../pairs.json" assert { type: "json" };

console.log("creating pairs...");

const { provider } = configureChains(
  [goerli],
  [
    alchemyProvider({ apiKey: "ZLR2ae9uziqXiA-4OM8RB13sqjuMRVHy" }),
    infuraProvider({ apiKey: "40fc95ffa3e24163ab868f6f82e91969" }),
    publicProvider(),
  ]
);

createClient({
  autoConnect: true,
  provider,
});

(async () => {
  let newPools = [...addresses];
  const addressesLength = addresses.length;

  const sellPoolAddressesContracts = newPools.map(item => ({
    address: "0x247B707Ac8b1f58fc4Ef0610Eb5d716211A9EEF4",
    args: [
      item.underlying.address,
      item.accounting.address
    ],
    abi: rawFactoryABI,
    functionName: "pools",
  }))

  const buyPoolAddressesContracts = newPools.map(item => ({
    address: "0x247B707Ac8b1f58fc4Ef0610Eb5d716211A9EEF4",
    args: [
      item.accounting.address,
      item.underlying.address
    ],
    abi: rawFactoryABI,
    functionName: "pools",
  }))

  const sellPoolAddresses = await readContracts({
    contracts: sellPoolAddressesContracts,
  });

  const buyPoolAddresses = await readContracts({
    contracts: buyPoolAddressesContracts,
  });

  const underlyingTokensContracts = newPools.map((item) => ({
    abi: erc20ABI,
    functionName: "decimals",
    address: item.underlying.address,
  }));

  const accountingTokensContracts = newPools.map((item) => ({
    abi: erc20ABI,
    functionName: "decimals",
    address: item.accounting.address,
  }));

  const underlyingTokensDecimals = await readContracts({
    contracts: underlyingTokensContracts,
  });

  const accountingTokensDecimals = await readContracts({
    contracts: accountingTokensContracts,
  });

  const newData = [...Array(addressesLength)].map(_ => ({
    sell: {
      underlying: {},
      accounting: {}
    },
    buy: {
      underlying: {},
      accounting: {}
    }
  }));

  for (let i = 0; i < addressesLength; i++) {

    newData[i].base = newPools[i].base;
    newData[i].tick = newPools[i].tick;
    newData[i].underlyingLabel = newPools[i].underlying.label;
    newData[i].accountingLabel = newPools[i].accounting.label;
    newData[i].sell.address = sellPoolAddresses[i];
    newData[i].buy.address = buyPoolAddresses[i];
    newData[i].sell.underlying.displayPrecision = newPools[i].underlying.displayPrecision;
    newData[i].buy.underlying.displayPrecision = newPools[i].accounting.displayPrecision;
    newData[i].sell.accounting.displayPrecision = newPools[i].accounting.displayPrecision;
    newData[i].buy.accounting.displayPrecision = newPools[i].underlying.displayPrecision;
    newData[i].sell.underlying.address = newPools[i].underlying.address;
    newData[i].buy.underlying.address = newPools[i].accounting.address;
    newData[i].sell.accounting.address = newPools[i].accounting.address;
    newData[i].buy.accounting.address = newPools[i].underlying.address;
    newData[i].sell.underlying.decimals = underlyingTokensDecimals[i];
    newData[i].buy.underlying.decimals = accountingTokensDecimals[i];
    newData[i].sell.accounting.decimals = accountingTokensDecimals[i];
    newData[i].buy.accounting.decimals = underlyingTokensDecimals[i];
  }

  fs.writeFileSync("./src/data/pools.json", JSON.stringify(newData));

  console.log("pairs created");
})();
