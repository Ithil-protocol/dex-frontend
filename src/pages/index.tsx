import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/container/Home").then((c) => c.default), {
  ssr: false,
});

export default function home() {
  return <Home />;
}
