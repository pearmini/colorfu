import ReactFullpage from "@fullpage/react-fullpage";

function Index() {
  return (
    <ReactFullpage
    //fullpage options
    licenseKey = {'YOUR_KEY_HERE'}
    scrollingSpeed = {1000} /* Options here */

    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section">
            <p>Section 1 (welcome to fullpage.js)</p>
            <button onClick={() => fullpageApi.moveSectionDown()}>
              Click me to move down
            </button>
          </div>
          <div className="section">
            <p>Section 2</p>
          </div>
          <div className="section">
            <p>Section 3</p>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
  );
}

export default Index;