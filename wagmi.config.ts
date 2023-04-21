/** @type {import('@wagmi/cli').Config} */
import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20ABI, goerli } from "wagmi";
import { contractABI, factoryABI } from "./src/store/abi";
export default defineConfig([
  {
    out: "src/hooks/contracts/pool.ts",
    contracts: [
      {
        abi: contractABI,
        name: "pool",
      },
    ],
    plugins: [react()],
  },
  {
    out: "src/hooks/contracts/token.ts",
    contracts: [
      {
        abi: erc20ABI,
        name: "token",
      },
    ],
    plugins: [react()],
  },
  {
    out: "src/hooks/contracts/factory.ts",
    contracts: [
      {
        abi: factoryABI,
        name: "factory",
      },
    ],
    plugins: [react()],
  },
]);
