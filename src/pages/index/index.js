import useWindowSize from "../../hooks/useWindowSize";
import useScrollHeight from "../../hooks/useScrollHeight";
import * as d3 from "d3-scale";
import MacBookPro from "../../components/MacBookPro";
import WordsPaper from "../../components/WordsPaper";
import { Carousel } from "antd";

export default function() {
  const [width, height] = useWindowSize();
  const scrollHeight = useScrollHeight();
  const extraHeight = 300;

  function getCurrentState(progress, maxProgress) {
    const scale = d3
      .scaleLinear()
      .domain([0, maxProgress])
      .range([1, 0.4]);
    const y = d3
      .scaleLinear()
      .domain([0, maxProgress])
      .range([0, 150]);

    const macWidth = d3
      .scaleLinear()
      .domain([0, maxProgress])
      .range([width, height * 1.6]);

    return {
      scale: scale(progress),
      x: 0,
      y: y(progress),
      macWidth: macWidth(progress)
    };
  }
  const { scale, x, y, macWidth } = getCurrentState(scrollHeight, extraHeight);

  return (
    <div style={{ width, height: height + extraHeight }}>
      <div style={{ width, height, position: "fixed" }}>
        <div
          style={{
            width,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 100
          }}
        >
          <div style={{ fontSize: 80, color: "black", fontWeight: "bold" }}>
            Make unique wallpaper.
          </div>
          <div style={{ fontSize: 80, color: "black", fontWeight: "bold" }}>
            Express different.
          </div>
        </div>

        <div style={{ position: "absolute", left: "50%", top: "50%" }}>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`
            }}
          >
            <MacBookPro width={macWidth} height={height}>
              <Carousel autoplay>
                <div>
                  <WordsPaper
                    width={macWidth}
                    height={height}
                    title="♞ell⦿ 2☯︎2零"
                    backgroundColor="#fd5e53"
                    color="white"
                    fontSize={250}
                  />
                </div>
                <div>
                  <WordsPaper
                    width={macWidth}
                    height={height}
                    title="╭(●｀∀´●)╯"
                    backgroundColor="#ffd369"
                    color="purple"
                    fontSize={200}
                  />
                </div>
              </Carousel>
            </MacBookPro>
          </div>
        </div>
      </div>
    </div>
  );
}
