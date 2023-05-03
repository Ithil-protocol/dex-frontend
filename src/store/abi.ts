import { rawContractABI, rawFactoryABI } from "./abi-raw.mjs";
import type { poolABI } from "@/hooks/contracts/pool";

//@ts-ignore
export const contractABI: typeof poolABI = rawContractABI as const;
//@ts-ignore
export const factoryABI: typeof poolABI = rawFactoryABI as const;
