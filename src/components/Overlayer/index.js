import { connect } from "dva";

function OverLayer({ show, children }) {
  const styles = {
    contianer: {
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 3
    }
  };
  return show ? <div style={styles.contianer}>{children}</div> : <></>;
}

export default connect(({ control }) => ({ show: control.showOverlayer }))(
  OverLayer
);
