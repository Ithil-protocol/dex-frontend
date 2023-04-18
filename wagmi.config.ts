/** @type {import('@wagmi/cli').Config} */
import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { erc20ABI } from "wagmi";
import { contractABI } from "./src/store/abi";
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
]);
