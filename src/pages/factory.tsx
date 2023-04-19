import dynamic from "next/dynamic";

const Factory = dynamic(
  () => import("Container/Factory").then((w) => w.default),
  {
    ssr: false,
  }
);

export default function factory() {
  return <Factory />;
}
