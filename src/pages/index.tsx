import { useSignedIn } from "@/hooks/useSignedIn";
import dynamic from "next/dynamic";

const Panel = dynamic(
  () => import("@/container/Panel").then((w) => w.default),
  {
    ssr: false,
  }
);

export default function Home() {
  const isConnected = useSignedIn();
  return <Panel />;
}
