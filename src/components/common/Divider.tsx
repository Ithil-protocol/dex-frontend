export default function Divider({ color = "#485369" }) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${color}`,
        width: "100%",
      }}
    />
  );
}
