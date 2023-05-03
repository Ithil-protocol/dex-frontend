import dynamic from "next/dynamic";

const Factory = dynamic(
  () => import("@/container/Factory").then((w) => w.default),
  {
    ssr: false,
  }
);

export default function factory() {
  return <Factory />;
}
