import WordsInColor from "../WordsInColor";
import { useWindowSize } from "react-use";
import { connect } from "dva";

function Emulator(props) {
  const { width, height } = useWindowSize();
  const scale = 0.7;
  return (
    <div>
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "left top",
          width: width * scale,
          height: height * scale
        }}
      >
        <WordsInColor {...props} width={width} height={height} scale={scale} />
      </div>
    </div>
  );
}

export default connect(({ example }) => ({
  ...example
}))(Emulator);
