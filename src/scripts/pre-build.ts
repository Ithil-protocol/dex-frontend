import { configureChains, createClient, erc20ABI } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { readContracts } from "wagmi";
import fs from "fs";
import addresses from "../../pairs.json" assert { type: "json" };
import nextEnv from "@next/env";
import { Pair } from "../types";
import { network } from "../config/network.ts";
import { factoryAddress } from "../config/factory.ts";
import { factoryABI } from "../hooks/contracts/factory.ts";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const { provider } = configureChains(
  [network],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_INFURA_HTTP_ADDRESS!,
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_ALCHEMY_HTTP_ADDRESS!,
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_BLOCKPI_HTTP_ADDRESS!,
      }),
    }),
  ]
);

createClient({
  autoConnect: true,
  provider,
});

(async () => {
  const newPools = [...addresses];
  const addressesLength = addresses.length;

  const sellPoolAddressesContracts = newPools.map((item) => ({
    address: factoryAddress as `0x${string}`,
    args: [item.underlying.address, item.accounting.address],
    abi: factoryABI,
    functionName: "pools",
  }));

  const buyPoolAddressesContracts = newPools.map((item) => ({
    address: factoryAddress as `0x${string}`,
    args: [item.accounting.address, item.underlying.address],
    abi: factoryABI,
    functionName: "pools",
  }));

  const sellPoolAddresses = await readContracts({
    contracts: sellPoolAddressesContracts,
  });

  const buyPoolAddresses = await readContracts({
    contracts: buyPoolAddressesContracts,
  });

  const underlyingTokensContracts = newPools.map((item) => ({
    abi: erc20ABI,
    functionName: "decimals",
    address: item.underlying.address as `0x${string}`,
  }));

  const accountingTokensContracts = newPools.map((item) => ({
    abi: erc20ABI,
    functionName: "decimals",
    address: item.accounting.address as `0x${string}`,
  }));

  const underlyingTokensDecimals: number[] = (await readContracts({
    contracts: underlyingTokensContracts,
  })) as number[];

  const accountingTokensDecimals: number[] = (await readContracts({
    contracts: accountingTokensContracts,
  })) as number[];

  const newData: Pair[] = [...Array(addressesLength)].map((_) => ({
    sell: {
      underlying: {},
      accounting: {},
    },
    buy: {
      underlying: {},
      accounting: {},
    },
  })) as unknown as Pair[];

  for (let i = 0; i < addressesLength; i++) {
    newData[i].base = newPools[i].base;
    newData[i].tick = newPools[i].tick;
    newData[i].chartUrl = newPools[i].chartUrl;
    newData[i].underlyingLabel = newPools[i].underlying.label;
    newData[i].accountingLabel = newPools[i].accounting.label;
    newData[i].sell.address = sellPoolAddresses[i] as `0x${string}`;
    newData[i].buy.address = buyPoolAddresses[i] as `0x${string}`;
    newData[i].sell.underlying.displayPrecision =
      newPools[i].underlying.displayPrecision;
    newData[i].buy.underlying.displayPrecision =
      newPools[i].accounting.displayPrecision;
    newData[i].sell.accounting.displayPrecision =
      newPools[i].accounting.displayPrecision;
    newData[i].buy.accounting.displayPrecision =
      newPools[i].underlying.displayPrecision;
    newData[i].sell.underlying.address = newPools[i].underlying
      .address as `0x${string}`;
    newData[i].buy.underlying.address = newPools[i].accounting
      .address as `0x${string}`;
    newData[i].sell.accounting.address = newPools[i].accounting
      .address as `0x${string}`;
    newData[i].buy.accounting.address = newPools[i].underlying
      .address as `0x${string}`;
    newData[i].sell.underlying.decimals = underlyingTokensDecimals[i];
    newData[i].buy.underlying.decimals = accountingTokensDecimals[i];
    newData[i].sell.accounting.decimals = accountingTokensDecimals[i];
    newData[i].buy.accounting.decimals = underlyingTokensDecimals[i];
  }

  fs.writeFileSync("./src/data/pools.json", JSON.stringify(newData));
})();
