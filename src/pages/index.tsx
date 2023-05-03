import dynamic from "next/dynamic";

const Panel = dynamic(
  () => import("@/container/Panel").then((w) => w.default),
  {
    ssr: false,
  }
);

export default function home() {
  return <Panel />;
}
