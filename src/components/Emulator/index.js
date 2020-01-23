import WordsPaper from "../WordsPaper";
import useWindowSize from "../../hooks/useWindowSize";
import { connect } from "dva";

function Emulator({ value}) {
  const [width, height] = useWindowSize();
  const scale =  0.7;
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
        <WordsPaper
          {...value}
          width={width}
          height={height}
          id="example-wordspaper"
        />
      </div>
    </div>
  );
}

export default connect(({ example }) => ({
  value: example.value
}))(Emulator);
