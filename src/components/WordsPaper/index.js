export default function({
  title,
  width,
  height,
  color,
  backgroundColor,
  fontSize,
  mode = "horizontal",
  id
}) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }}
      id={id}
    >
      <div
        id="text-container"
        style={{
          wordBbreak: "keep-all",
          whiteSpace: "nowrap",
          overflow: "hidden",
          writingMode: mode === "v" && "tb",
          fontFamily: "Righteous",
          fontSize,
          color,
          fontWeight: "bold"
        }}
      >
        {title}
      </div>
    </div>
  );
}
