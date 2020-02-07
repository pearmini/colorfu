import WordsPaper from "../WordsPaper";
import useWindowSize from "react-use";
import { connect } from "dva";

function Emulator(props) {
  const [width, height] = useWindowSize();
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
        <WordsPaper {...props} width={width} height={height} />
      </div>
    </div>
  );
}

export default connect(({ example }) => ({
  ...example
}))(Emulator);
