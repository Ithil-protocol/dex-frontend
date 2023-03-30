const DividerWithText = ({ style = {}, label = "" }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          borderBottom: "2px solid lightgray",
          marginRight: "5px",
          width: "95%",
        }}
      />
      <div
        style={{
          color: "gray",
          fontWeight: "bold",
          margin: "5px 0px 10px",
          padding: label ? "0px 10px" : "",
          whiteSpace: "nowrap",
          ...style,
        }}
      >
        {label}
      </div>
      <div
        style={{
          borderBottom: "2px solid lightgray",
          width: "95%",
          marginLeft: "5px",
        }}
      />
    </div>
  );
};
export default DividerWithText;
