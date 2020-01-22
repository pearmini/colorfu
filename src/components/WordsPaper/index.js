export default function({
  title,
  width,
  height,
  color,
  backgroundColor,
  fontSize
}) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor,
        color,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          flex: 1,
          fontSize,
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Righteous"
        }}
      >
        <div
          id="text-container"
          style={{
            wordBbreak: "keep-all",
            whiteSpace: "nowrap",
            overflow: "hidden",
            writingMode: height > width && "tb"
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}
