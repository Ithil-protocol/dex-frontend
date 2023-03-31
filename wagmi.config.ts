import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { contractABI } from "store/abi";

export default defineConfig({
  out: "src/hooks/contracts/pools.ts",
  contracts: [
    {
      abi: contractABI,
      name: "pools",
    },
  ],
  plugins: [react()],
});
