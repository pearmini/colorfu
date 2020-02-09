import styled from "styled-components";
const Contianer = styled.div.attrs(props => ({
  style: {
    lineHeight: props.style.height + "px"
  }
}))`
  text-align: center;
  font-family: "Righteous";
  white-space: nowrap;
  overflow: hidden;
`;
function WordsInColor({ title, mode, ...style }) {
  return <Contianer style={style}>{title}</Contianer>;
}

export default WordsInColor;
