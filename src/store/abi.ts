import { rawContractABI, rawFactoryABI } from "./abi-raw.mjs";
import type { poolABI } from "@/hooks/contracts/pool";

//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const contractABI: typeof poolABI = rawContractABI as const;
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const factoryABI: typeof poolABI = rawFactoryABI as const;
