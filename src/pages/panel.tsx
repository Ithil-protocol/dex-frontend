import dynamic from "next/dynamic";

const Panel = dynamic(() => import("Container/Panel").then((w) => w.default), {
  ssr: false,
});

export default function panel() {
  return <Panel />;
}
