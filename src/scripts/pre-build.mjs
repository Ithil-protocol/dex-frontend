import { configureChains, createClient, goerli, erc20ABI } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { readContracts } from "wagmi";
import fs from "fs";
import { rawContractABI } from "../store/abi-raw.mjs";

import addresses from "../data/addresses.json" assert { type: "json" };

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [
    alchemyProvider({ apiKey: "ZLR2ae9uziqXiA-4OM8RB13sqjuMRVHy" }),
    infuraProvider({ apiKey: "40fc95ffa3e24163ab868f6f82e91969" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "ithil dex",
  chains,
});

createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors,
});

(async () => {
  let newPools = [...addresses];
  const addressesLength = addresses.length;

  const underlyingContracts = addresses.map((item) => ({
    abi: rawContractABI,
    functionName: "underlying",
    address: item.address,
  }));

  const accountingContracts = addresses.map((item) => ({
    abi: rawContractABI,
    functionName: "accounting",
    address: item.address,
  }));

  const underlyingPromise = await readContracts({
    contracts: underlyingContracts,
  });

  const accountingPromise = await readContracts({
    contracts: accountingContracts,
  });

  console.log("underlyingPromise", underlyingPromise);

  const tokens = [...underlyingPromise, ...accountingPromise];

  const tokenContracts = tokens.map((item) => ({
    abi: erc20ABI,
    functionName: "decimals",
    address: item,
  }));

  const tokensDecimals = await readContracts({
    contracts: tokenContracts,
  });

  for (let i = 0; i < addressesLength; i++) {
    newPools[i].sell.underlying.address = underlyingPromise[i];
    newPools[i].sell.accounting.address = accountingPromise[i];
    newPools[i].buy.accounting.address = underlyingPromise[i];
    newPools[i].buy.underlying.address = accountingPromise[i];
    newPools[i].sell.underlying.decimals = tokensDecimals[i * 2];
    newPools[i].buy.underlying.decimals = tokensDecimals[i * 2 + 1];
    newPools[i].sell.accounting.decimals = tokensDecimals[i * 2 + 1];
    newPools[i].buy.accounting.decimals = tokensDecimals[i * 2];
  }

  fs.writeFileSync("./src/data/pools.json", JSON.stringify(newPools));

  console.log("tokensDecimals", tokensDecimals);
})();

console.log("test");
