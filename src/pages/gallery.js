import Dock from "../components/Dock/index";
import { Row, Col } from "antd";
import Wordspaper from "../components/WordsPaper/index";
import useWindowSize from "../hooks/useWindowSize";
import { connect } from "dva";
import router from "umi/router";

function Gallery({
  selectedTypeId,
  types,
  setExample,
  setSelectedNav,
  setSelectedType
}) {
  const type = types.find(item => item.id === selectedTypeId);
  const [width, height] = useWindowSize();
  const { wordspapers } = type;
  const scale = 0.2;

  function handleClick(words) {
    setExample(words);
    setSelectedNav("create");
    router.push("/create");
  }

  return (
    <div style={{ marginTop: 56 }}>
      <Dock types={types} onClick={setSelectedType} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          height: 250
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: "bold"
          }}
        >
          {type.title}
        </div>
        <div>{type.intro}</div>
      </div>
      <div>
        <Row gutter={[0, 32]}>
          {wordspapers.map((words, index) => (
            <Col
              key={index}
              span={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "left top",
                  width: width * scale,
                  height: height * scale,
                  cursor: "pointer"
                }}
                onClick={() => handleClick(words)}
              >
                <Wordspaper {...words} width={width} height={height} />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default connect(({ gallery }) => ({ ...gallery }), {
  setSelectedType: id => ({ type: "gallery/setSelectedType", payload: { id } }),
  setExample: words => ({ type: "example/setExample", payload: { words } }),
  setSelectedNav: key => ({ type: "control/setSelectedNav", payload: { key } })
})(Gallery);
