import { configureChains, createClient, goerli, erc20ABI } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { readContracts } from "wagmi";
import fs from "fs";
import { rawContractABI } from "../store/abi-raw.mjs";

import addresses from "../data/addresses.json" assert { type: "json" };

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

  const underlyingContracts = addresses.flatMap((item) => [{
    abi: rawContractABI,
    functionName: "underlying",
    address: item.sell.address,
  },
  {
    abi: rawContractABI,
    functionName: "underlying",
    address: item.buy.address,
  }]);

  const accountingContracts = addresses.flatMap((item) => [{
    abi: rawContractABI,
    functionName: "accounting",
    address: item.sell.address,
  },
  {
    abi: rawContractABI,
    functionName: "accounting",
    address: item.buy.address,
  }]);


  const underlyingPromise = await readContracts({
    contracts: underlyingContracts,
  });

  const accountingPromise = await readContracts({
    contracts: accountingContracts,
  });

  const underlyingTokensContracts = underlyingPromise.map((item) => ({
    abi: erc20ABI,
    functionName: "decimals",
    address: item,
  }));

  const accountingTokensContracts = accountingPromise.map((item) => ({
    abi: erc20ABI,
    functionName: "decimals",
    address: item,
  }));

  const underlyingTokensDecimals = await readContracts({
    contracts: underlyingTokensContracts,
  });

  const accountingTokensDecimals = await readContracts({
    contracts: accountingTokensContracts,
  });

  for (let i = 0; i < addressesLength; i++) {

    const sellIndex = i * 2;
    const buyIndex = i * 2 + 1;

    newPools[i].sell.underlying.address = underlyingPromise[sellIndex];
    newPools[i].buy.underlying.address = underlyingPromise[buyIndex];
    newPools[i].sell.accounting.address = accountingPromise[sellIndex];
    newPools[i].buy.accounting.address = accountingPromise[buyIndex];
    newPools[i].sell.underlying.decimals = underlyingTokensDecimals[sellIndex];
    newPools[i].buy.underlying.decimals = underlyingTokensDecimals[buyIndex];
    newPools[i].sell.accounting.decimals = accountingTokensDecimals[sellIndex];
    newPools[i].buy.accounting.decimals = accountingTokensDecimals[buyIndex];
  }

  fs.writeFileSync("./src/data/pools.json", JSON.stringify(newPools));

  console.log("pairs created");
})();
