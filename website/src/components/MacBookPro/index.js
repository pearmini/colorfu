import mac from "../../static/images/mac.jpg";
export default function({ width, height, children }) {
  const hardwareWidth = width + 520,
    hardwareHeight = height + 230;

  return (
    <div
      style={{
        width,
        height
      }}
    >
      <img
        src={mac}
        width={hardwareWidth}
        height={hardwareHeight}
        style={{
          position: "absolute",
          left: (width - hardwareWidth) / 2,
          top: (height - hardwareHeight) / 2 + 30
        }}
      />
      <div
        style={{
          position: "absolute",
          width,
          overflow: "hidden"
        }}
      >
        {children}
      </div>
    </div>
  );
}
