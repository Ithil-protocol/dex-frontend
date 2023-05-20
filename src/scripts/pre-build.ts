import { configureChains, createClient, erc20ABI } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { readContracts } from "wagmi";
import fs from "fs";
import { pairs as addresses } from "../config/pairs.ts";
import nextEnv from "@next/env";
import { Pair } from "../types";
import { network } from "../config/network.ts";
import { factoryAddress } from "../config/factory.ts";
import { factoryABI } from "../store/abi.ts";
import { allProviders } from "../config/providers.ts";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const { provider } = configureChains([network], [publicProvider()]);

createClient({
  autoConnect: true,
  provider,
});

(async () => {
  const newPools = [...addresses];
  const addressesLength = addresses.length;

  const sellPoolAddressesContracts = newPools.map((item) => ({
    address: factoryAddress as `0x${string}`,
    args: [item.underlying.address, item.accounting.address, item.tick],
    abi: factoryABI,
    functionName: "pools",
  }));

  const buyPoolAddressesContracts = newPools.map((item) => ({
    address: factoryAddress as `0x${string}`,
    args: [item.accounting.address, item.underlying.address, item.tick],
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

  const newData: Pair[] = [...Array(addressesLength * 2)].map((_) => ({
    sell: {
      underlying: {},
      accounting: {},
    },
    buy: {
      underlying: {},
      accounting: {},
    },
  })) as unknown as Pair[];

  for (let i = 0; i < addressesLength * 2; i++) {
    const isEven = i % 2 === 0;
    const j = Math.floor(i / 2);

    newData[i].base = isEven
      ? newPools[j].undToAccBase
      : newPools[j].accToUndBase;
    newData[i].tick = newPools[j].tick;
    newData[i].chartUrl = isEven
      ? newPools[j].undToAccChartUrl
      : newPools[j].accToUndChartUrl;
    newData[i].underlyingLabel = isEven
      ? newPools[j].underlying.label
      : newPools[j].accounting.label;
    newData[i].accountingLabel = isEven
      ? newPools[j].accounting.label
      : newPools[j].underlying.label;
    newData[i].sell.address = isEven
      ? (sellPoolAddresses[j] as `0x${string}`)
      : (buyPoolAddresses[j] as `0x${string}`);
    newData[i].buy.address = isEven
      ? (buyPoolAddresses[j] as `0x${string}`)
      : (sellPoolAddresses[j] as `0x${string}`);
    newData[i].sell.underlying.displayPrecision = isEven
      ? newPools[j].underlying.displayPrecision
      : newPools[j].accounting.displayPrecision;
    newData[i].buy.underlying.displayPrecision = isEven
      ? newPools[j].accounting.displayPrecision
      : newPools[j].underlying.displayPrecision;
    newData[i].sell.accounting.displayPrecision = isEven
      ? newPools[j].accounting.displayPrecision
      : newPools[j].underlying.displayPrecision;
    newData[i].buy.accounting.displayPrecision = isEven
      ? newPools[j].underlying.displayPrecision
      : newPools[j].accounting.displayPrecision;
    newData[i].sell.underlying.address = isEven
      ? (newPools[j].underlying.address as `0x${string}`)
      : (newPools[j].accounting.address as `0x${string}`);
    newData[i].buy.underlying.address = isEven
      ? (newPools[j].accounting.address as `0x${string}`)
      : (newPools[j].underlying.address as `0x${string}`);
    newData[i].sell.accounting.address = isEven
      ? (newPools[j].accounting.address as `0x${string}`)
      : (newPools[j].underlying.address as `0x${string}`);
    newData[i].buy.accounting.address = isEven
      ? (newPools[j].underlying.address as `0x${string}`)
      : (newPools[j].accounting.address as `0x${string}`);
    newData[i].sell.underlying.decimals = isEven
      ? underlyingTokensDecimals[j]
      : accountingTokensDecimals[j];
    newData[i].buy.underlying.decimals = isEven
      ? accountingTokensDecimals[j]
      : underlyingTokensDecimals[j];
    newData[i].sell.accounting.decimals = isEven
      ? accountingTokensDecimals[j]
      : underlyingTokensDecimals[j];
    newData[i].buy.accounting.decimals = isEven
      ? underlyingTokensDecimals[j]
      : accountingTokensDecimals[j];
  }

  fs.writeFileSync("./src/data/pools.json", JSON.stringify(newData));
})();
